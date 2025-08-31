import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './users';
import postRoutes from './posts';

const router = Router();

// API versioned routes
router.use('/v1/auth', authRoutes);
router.use('/v1/users', userRoutes);
router.use('/v1/posts', postRoutes);

export default router;