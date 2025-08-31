import { Post } from '@prisma/client';
import { PostRepository, PrismaPostRepository } from '@/repositories/PostRepository';
import { UserRepository, PrismaUserRepository } from '@/repositories/UserRepository';
import { AppError } from '@/middleware/errorHandler';
import {
  CreatePostDto,
  UpdatePostDto,
  PostDto,
} from '@/types/dto';

export class PostService {
  private postRepository: PostRepository;
  private userRepository: UserRepository;

  constructor(
    postRepository: PostRepository = new PrismaPostRepository(),
    userRepository: UserRepository = new PrismaUserRepository()
  ) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
  }

  async createPost(authorId: string, data: CreatePostDto): Promise<PostDto> {
    const author = await this.userRepository.findById(authorId);
    if (!author) {
      throw AppError.notFound('Author not found');
    }

    const post = await this.postRepository.create({
      body: data.body,
      mediaUrls: data.mediaUrls || undefined,
      visibility: data.visibility || 'PUBLIC',
      author: { connect: { id: authorId } },
    });

    return this.toPostDto(post, authorId);
  }

  async getPost(id: string, currentUserId?: string): Promise<PostDto> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw AppError.notFound('Post not found');
    }

    return this.toPostDto(post, currentUserId);
  }

  async updatePost(id: string, authorId: string, data: UpdatePostDto): Promise<PostDto> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw AppError.notFound('Post not found');
    }

    if (post.authorId !== authorId) {
      throw AppError.forbidden('Cannot edit another user\'s post');
    }

    const updatedPost = await this.postRepository.update(id, data);
    return this.toPostDto(updatedPost, authorId);
  }

  async deletePost(id: string, authorId: string): Promise<void> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw AppError.notFound('Post not found');
    }

    if (post.authorId !== authorId) {
      throw AppError.forbidden('Cannot delete another user\'s post');
    }

    await this.postRepository.delete(id);
  }

  async getUserPosts(
    userId: string,
    limit: number = 20,
    offset: number = 0,
    currentUserId?: string
  ): Promise<PostDto[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw AppError.notFound('User not found');
    }

    const posts = await this.postRepository.findByAuthor(userId, {
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return Promise.all(posts.map(post => this.toPostDto(post, currentUserId)));
  }

  async getPublicPosts(
    limit: number = 20,
    offset: number = 0,
    currentUserId?: string
  ): Promise<PostDto[]> {
    const posts = await this.postRepository.findMany({
      skip: offset,
      take: limit,
      where: { visibility: 'PUBLIC' },
      orderBy: { createdAt: 'desc' },
    });

    return Promise.all(posts.map(post => this.toPostDto(post, currentUserId)));
  }

  private async toPostDto(post: any, currentUserId?: string): Promise<PostDto> {
    const [reactionCount, commentCount, userReaction] = await Promise.all([
      this.postRepository.getReactionCount(post.id),
      this.postRepository.getCommentCount(post.id),
      currentUserId ? this.postRepository.getUserReaction(post.id, currentUserId) : null,
    ]);

    return {
      id: post.id,
      body: post.body,
      mediaUrls: post.mediaUrls as string[] || undefined,
      visibility: post.visibility,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      author: {
        id: post.author.id,
        handle: post.author.handle,
        name: post.author.name,
        avatarUrl: post.author.avatarUrl || undefined,
      },
      reactionCount,
      commentCount,
      userReaction: userReaction || undefined,
    };
  }
}