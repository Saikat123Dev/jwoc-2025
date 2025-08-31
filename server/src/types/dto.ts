// User DTOs
export interface UserProfileDto {
  id: string;
  handle: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  followerCount: number;
  followingCount: number;
  postCount: number;
  createdAt: string;
  isFollowing?: boolean;
}

export interface CreateUserDto {
  handle: string;
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export interface UpdateUserDto {
  name?: string;
  bio?: string;
  avatarUrl?: string;
}

// Post DTOs
export interface PostDto {
  id: string;
  body: string;
  mediaUrls?: string[];
  visibility: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    handle: string;
    name: string;
    avatarUrl?: string;
  };
  reactionCount: number;
  commentCount: number;
  userReaction?: string;
}

export interface CreatePostDto {
  body: string;
  mediaUrls?: string[];
  visibility?: 'PUBLIC' | 'FOLLOWERS' | 'PRIVATE';
}

export interface UpdatePostDto {
  body?: string;
  visibility?: 'PUBLIC' | 'FOLLOWERS' | 'PRIVATE';
}

// Comment DTOs
export interface CommentDto {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    handle: string;
    name: string;
    avatarUrl?: string;
  };
}

export interface CreateCommentDto {
  body: string;
}

export interface UpdateCommentDto {
  body: string;
}

// Reaction DTOs
export interface ReactionDto {
  id: string;
  type: string;
  createdAt: string;
  user: {
    id: string;
    handle: string;
    name: string;
    avatarUrl?: string;
  };
}

export interface CreateReactionDto {
  type: 'LIKE' | 'LOVE' | 'LAUGH' | 'ANGRY' | 'SAD';
}

// Feed DTOs
export interface FeedItemDto {
  id: string;
  post: PostDto;
  rank: number;
}

export interface FeedResponseDto {
  items: FeedItemDto[];
  nextCursor?: string;
  hasMore: boolean;
}

// Follow DTOs
export interface FollowDto {
  id: string;
  createdAt: string;
  follower: UserProfileDto;
  followee: UserProfileDto;
}

// Notification DTOs
export interface NotificationDto {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  metadata?: any;
  createdAt: string;
}

// Auth DTOs
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  handle: string;
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export interface AuthResponseDto {
  user: UserProfileDto;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}