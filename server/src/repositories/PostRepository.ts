import { Post, Prisma } from '@prisma/client';
import prisma from '@/config/database';

export interface PostRepository {
  create(data: Prisma.PostCreateInput): Promise<Post>;
  findById(id: string): Promise<Post | null>;
  update(id: string, data: Prisma.PostUpdateInput): Promise<Post>;
  delete(id: string): Promise<void>;
  findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
    include?: Prisma.PostInclude;
  }): Promise<Post[]>;
  count(where?: Prisma.PostWhereInput): Promise<number>;
  getReactionCount(postId: string): Promise<number>;
  getCommentCount(postId: string): Promise<number>;
  getUserReaction(postId: string, userId: string): Promise<string | null>;
  findByAuthor(authorId: string, params: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]>;
}

export class PrismaPostRepository implements PostRepository {
  async create(data: Prisma.PostCreateInput): Promise<Post> {
    return prisma.post.create({ data });
  }

  async findById(id: string): Promise<Post | null> {
    return prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        _count: {
          select: {
            reactions: true,
            comments: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.PostUpdateInput): Promise<Post> {
    return prisma.post.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.post.delete({
      where: { id },
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
    include?: Prisma.PostInclude;
  }): Promise<Post[]> {
    const { skip, take, where, orderBy, include } = params;
    return prisma.post.findMany({
      skip,
      take,
      where,
      orderBy,
      include: include || {
        author: true,
        _count: {
          select: {
            reactions: true,
            comments: true,
          },
        },
      },
    });
  }

  async count(where?: Prisma.PostWhereInput): Promise<number> {
    return prisma.post.count({ where });
  }

  async getReactionCount(postId: string): Promise<number> {
    return prisma.reaction.count({
      where: { postId },
    });
  }

  async getCommentCount(postId: string): Promise<number> {
    return prisma.comment.count({
      where: { postId },
    });
  }

  async getUserReaction(postId: string, userId: string): Promise<string | null> {
    const reaction = await prisma.reaction.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
      select: { type: true },
    });
    return reaction?.type || null;
  }

  async findByAuthor(authorId: string, params: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, orderBy } = params;
    return prisma.post.findMany({
      skip,
      take,
      where: { authorId },
      orderBy,
      include: {
        author: true,
        _count: {
          select: {
            reactions: true,
            comments: true,
          },
        },
      },
    });
  }
}