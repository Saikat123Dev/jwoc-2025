export interface QueueMessage {
  id: string;
  type: string;
  occurredAt: string;
  key: string;
  payload: any;
  schemaVersion: string;
  metadata?: {
    source: string;
    correlationId?: string;
    retryCount?: number;
  };
}

export interface PostCreatedEvent {
  postId: string;
  authorId: string;
  visibility: string;
  createdAt: string;
}

export interface ReactionCreatedEvent {
  reactionId: string;
  postId: string;
  userId: string;
  type: string;
  createdAt: string;
}

export interface FollowCreatedEvent {
  followId: string;
  followerId: string;
  followeeId: string;
  createdAt: string;
}

export interface CommentCreatedEvent {
  commentId: string;
  postId: string;
  authorId: string;
  createdAt: string;
}

export interface UserRegisteredEvent {
  userId: string;
  handle: string;
  email: string;
  createdAt: string;
}

export type EventPayload = 
  | PostCreatedEvent
  | ReactionCreatedEvent
  | FollowCreatedEvent
  | CommentCreatedEvent
  | UserRegisteredEvent;