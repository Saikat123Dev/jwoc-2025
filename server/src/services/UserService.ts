import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { UserRepository, PrismaUserRepository } from '@/repositories/UserRepository';
import { FollowRepository, PrismaFollowRepository } from '@/repositories/FollowRepository';
import config from '@/config/env';
import { AppError } from '@/middleware/errorHandler';
import {
  CreateUserDto,
  UpdateUserDto,
  UserProfileDto,
  LoginDto,
  RegisterDto,
  AuthResponseDto,
} from '@/types/dto';
import { JwtPayload } from '@/types/api';

export class UserService {
  private userRepository: UserRepository;
  private followRepository: FollowRepository;

  constructor(
    userRepository: UserRepository = new PrismaUserRepository(),
    followRepository: FollowRepository = new PrismaFollowRepository()
  ) {
    this.userRepository = userRepository;
    this.followRepository = followRepository;
  }

  async register(data: RegisterDto): Promise<AuthResponseDto> {
    // Check if user already exists
    const existingEmail = await this.userRepository.findByEmail(data.email);
    if (existingEmail) {
      throw AppError.conflict('Email already registered');
    }

    const existingHandle = await this.userRepository.findByHandle(data.handle);
    if (existingHandle) {
      throw AppError.conflict('Handle already taken');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Create user
    const user = await this.userRepository.create({
      handle: data.handle,
      name: data.name,
      email: data.email,
      bio: data.bio,
      // Note: In real app, password would be stored in separate auth table
    });

    // Generate tokens
    const { accessToken, refreshToken } = this.generateTokens(user.id);

    return {
      user: await this.toUserProfileDto(user),
      accessToken,
      refreshToken,
    };
  }

  async login(data: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw AppError.unauthorized('Invalid credentials');
    }

    // Note: In real app, password verification would be done against auth table
    // For demo purposes, we'll skip password verification
    
    const { accessToken, refreshToken } = this.generateTokens(user.id);

    return {
      user: await this.toUserProfileDto(user),
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET) as JwtPayload;
      
      if (decoded.type !== 'refresh') {
        throw AppError.unauthorized('Invalid token type');
      }

      const user = await this.userRepository.findById(decoded.userId);
      if (!user) {
        throw AppError.unauthorized('User not found');
      }

      const accessToken = this.generateAccessToken(user.id);
      return { accessToken };
    } catch (error) {
      throw AppError.unauthorized('Invalid refresh token');
    }
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getProfile(id: string, currentUserId?: string): Promise<UserProfileDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw AppError.notFound('User not found');
    }

    const profileDto = await this.toUserProfileDto(user);

    // Add following status if current user is provided
    if (currentUserId && currentUserId !== id) {
      profileDto.isFollowing = await this.followRepository.isFollowing(currentUserId, id);
    }

    return profileDto;
  }

  async updateProfile(id: string, data: UpdateUserDto): Promise<UserProfileDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw AppError.notFound('User not found');
    }

    const updatedUser = await this.userRepository.update(id, data);
    return this.toUserProfileDto(updatedUser);
  }

  async searchUsers(query: string, limit: number = 20, offset: number = 0): Promise<UserProfileDto[]> {
    const users = await this.userRepository.findMany({
      skip: offset,
      take: limit,
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { handle: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });

    return Promise.all(users.map(user => this.toUserProfileDto(user)));
  }

  private generateTokens(userId: string): { accessToken: string; refreshToken: string } {
    const accessToken = this.generateAccessToken(userId);
    const refreshToken = this.generateRefreshToken(userId);
    return { accessToken, refreshToken };
  }

  private generateAccessToken(userId: string): string {
    const payload: JwtPayload = {
      userId,
      type: 'access',
    };
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
  }

  private generateRefreshToken(userId: string): string {
    const payload: JwtPayload = {
      userId,
      type: 'refresh',
    };
    return jwt.sign(payload, config.JWT_REFRESH_SECRET, { expiresIn: config.JWT_REFRESH_EXPIRES_IN });
  }

  private async toUserProfileDto(user: User): Promise<UserProfileDto> {
    const [followerCount, followingCount, postCount] = await Promise.all([
      this.userRepository.getFollowerCount(user.id),
      this.userRepository.getFollowingCount(user.id),
      this.userRepository.getPostCount(user.id),
    ]);

    return {
      id: user.id,
      handle: user.handle,
      name: user.name,
      bio: user.bio || undefined,
      avatarUrl: user.avatarUrl || undefined,
      followerCount,
      followingCount,
      postCount,
      createdAt: user.createdAt.toISOString(),
    };
  }
}