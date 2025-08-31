import { Follow } from '@prisma/client';
import { FollowRepository, PrismaFollowRepository } from '@/repositories/FollowRepository';
import { UserRepository, PrismaUserRepository } from '@/repositories/UserRepository';
import { AppError } from '@/middleware/errorHandler';
import { FollowDto, UserProfileDto } from '@/types/dto';

export class FollowService {
  private followRepository: FollowRepository;
  private userRepository: UserRepository;

  constructor(
    followRepository: FollowRepository = new PrismaFollowRepository(),
    userRepository: UserRepository = new PrismaUserRepository()
  ) {
    this.followRepository = followRepository;
    this.userRepository = userRepository;
  }

  async followUser(followerId: string, followeeId: string): Promise<FollowDto> {
    if (followerId === followeeId) {
      throw AppError.badRequest('Cannot follow yourself');
    }

    // Check if users exist
    const [follower, followee] = await Promise.all([
      this.userRepository.findById(followerId),
      this.userRepository.findById(followeeId),
    ]);

    if (!follower) {
      throw AppError.notFound('Follower not found');
    }
    if (!followee) {
      throw AppError.notFound('User to follow not found');
    }

    // Check if already following
    const existingFollow = await this.followRepository.findByFollowerAndFollowee(followerId, followeeId);
    if (existingFollow) {
      throw AppError.conflict('Already following this user');
    }

    const follow = await this.followRepository.create({
      follower: { connect: { id: followerId } },
      followee: { connect: { id: followeeId } },
    });

    return this.toFollowDto(follow);
  }

  async unfollowUser(followerId: string, followeeId: string): Promise<void> {
    const follow = await this.followRepository.findByFollowerAndFollowee(followerId, followeeId);
    if (!follow) {
      throw AppError.notFound('Follow relationship not found');
    }

    await this.followRepository.delete(follow.id);
  }

  async getFollowers(
    userId: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<UserProfileDto[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw AppError.notFound('User not found');
    }

    const follows = await this.followRepository.findFollowers(userId, {
      skip: offset,
      take: limit,
    });

    const userService = new (await import('./UserService')).UserService();
    return Promise.all(follows.map(follow => 
      userService.getProfile(follow.follower.id)
    ));
  }

  async getFollowing(
    userId: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<UserProfileDto[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw AppError.notFound('User not found');
    }

    const follows = await this.followRepository.findFollowing(userId, {
      skip: offset,
      take: limit,
    });

    const userService = new (await import('./UserService')).UserService();
    return Promise.all(follows.map(follow => 
      userService.getProfile(follow.followee.id)
    ));
  }

  async isFollowing(followerId: string, followeeId: string): Promise<boolean> {
    return this.followRepository.isFollowing(followerId, followeeId);
  }

  async getFollowingIds(userId: string): Promise<string[]> {
    return this.followRepository.getFollowingIds(userId);
  }

  private async toFollowDto(follow: any): Promise<FollowDto> {
    const userService = new (await import('./UserService')).UserService();
    const [follower, followee] = await Promise.all([
      userService.getProfile(follow.follower.id),
      userService.getProfile(follow.followee.id),
    ]);

    return {
      id: follow.id,
      createdAt: follow.createdAt.toISOString(),
      follower,
      followee,
    };
  }
}