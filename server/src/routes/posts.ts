import { Router } from 'express';
import { PostController } from '@/controllers/PostController';
import { authenticate, optionalAuthenticate } from '@/middleware/auth';
import { createPostRateLimit } from '@/middleware/rateLimiter';

const router = Router();
const postController = new PostController();

/**
 * @swagger
 * /api/v1/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - body
 *             properties:
 *               body:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 2000
 *               mediaUrls:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *               visibility:
 *                 type: string
 *                 enum: [PUBLIC, FOLLOWERS, PRIVATE]
 *                 default: PUBLIC
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication required
 */
router.post('/', authenticate, createPostRateLimit, postController.createPost);

/**
 * @swagger
 * /api/v1/posts/public:
 *   get:
 *     summary: Get public posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           maximum: 100
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: Public posts retrieved successfully
 */
router.get('/public', optionalAuthenticate, postController.getPublicPosts);

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *       404:
 *         description: Post not found
 */
router.get('/:id', optionalAuthenticate, postController.getPost);

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 2000
 *               visibility:
 *                 type: string
 *                 enum: [PUBLIC, FOLLOWERS, PRIVATE]
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Cannot edit another user's post
 *       404:
 *         description: Post not found
 */
router.put('/:id', authenticate, postController.updatePost);

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Cannot delete another user's post
 *       404:
 *         description: Post not found
 */
router.delete('/:id', authenticate, postController.deletePost);

export default router;