import { Follow, Prisma } from '@prisma/client';
import prisma from '@/config/database';

export interface FollowRepository {
  create(data: Prisma.FollowCreateInput): Promise<Follow>;
  findById(id: string): Promise<Follow | null>;
  delete(id: string): Promise<void>;
  findByFollowerAndFollowee(followerId: string, followeeId: string): Promise<Follow | null>;
  findFollowers(userId: string, params: {
    skip?: number;
    take?: number;
  }): Promise<Follow[]>;
  findFollowing(userId: string, params: {
    skip?: number;
    take?: number;
  }): Promise<Follow[]>;
  isFollowing(followerId: string, followeeId: string): Promise<boolean>;
  getFollowerIds(userId: string): Promise<string[]>;
  getFollowingIds(userId: string): Promise<string[]>;
}

export class PrismaFollowRepository implements FollowRepository {
  async create(data: Prisma.FollowCreateInput): Promise<Follow> {
    return prisma.follow.create({ data });
  }

  async findById(id: string): Promise<Follow | null> {
    return prisma.follow.findUnique({
      where: { id },
      include: {
        follower: true,
        followee: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.follow.delete({
      where: { id },
    });
  }

  async findByFollowerAndFollowee(followerId: string, followeeId: string): Promise<Follow | null> {
    return prisma.follow.findUnique({
      where: {
        followerId_followeeId: { followerId, followeeId },
      },
    });
  }

  async findFollowers(userId: string, params: {
    skip?: number;
    take?: number;
  }): Promise<Follow[]> {
    const { skip, take } = params;
    return prisma.follow.findMany({
      skip,
      take,
      where: { followeeId: userId },
      include: {
        follower: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findFollowing(userId: string, params: {
    skip?: number;
    take?: number;
  }): Promise<Follow[]> {
    const { skip, take } = params;
    return prisma.follow.findMany({
      skip,
      take,
      where: { followerId: userId },
      include: {
        followee: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async isFollowing(followerId: string, followeeId: string): Promise<boolean> {
    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followeeId: { followerId, followeeId },
      },
    });
    return !!follow;
  }

  async getFollowerIds(userId: string): Promise<string[]> {
    const follows = await prisma.follow.findMany({
      where: { followeeId: userId },
      select: { followerId: true },
    });
    return follows.map(f => f.followerId);
  }

  async getFollowingIds(userId: string): Promise<string[]> {
    const follows = await prisma.follow.findMany({
      where: { followerId: userId },
      select: { followeeId: true },
    });
    return follows.map(f => f.followeeId);
  }
}