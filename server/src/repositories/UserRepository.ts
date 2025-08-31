import { User, Prisma } from '@prisma/client';
import prisma from '@/config/database';

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByHandle(handle: string): Promise<User | null>;
  update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
  delete(id: string): Promise<void>;
  findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]>;
  count(where?: Prisma.UserWhereInput): Promise<number>;
  getFollowerCount(userId: string): Promise<number>;
  getFollowingCount(userId: string): Promise<number>;
  getPostCount(userId: string): Promise<number>;
}

export class PrismaUserRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email, deletedAt: null },
    });
  }

  async findByHandle(handle: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { handle, deletedAt: null },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, where, orderBy } = params;
    return prisma.user.findMany({
      skip,
      take,
      where: { ...where, deletedAt: null },
      orderBy,
    });
  }

  async count(where?: Prisma.UserWhereInput): Promise<number> {
    return prisma.user.count({
      where: { ...where, deletedAt: null },
    });
  }

  async getFollowerCount(userId: string): Promise<number> {
    return prisma.follow.count({
      where: { followeeId: userId },
    });
  }

  async getFollowingCount(userId: string): Promise<number> {
    return prisma.follow.count({
      where: { followerId: userId },
    });
  }

  async getPostCount(userId: string): Promise<number> {
    return prisma.post.count({
      where: { authorId: userId },
    });
  }
}