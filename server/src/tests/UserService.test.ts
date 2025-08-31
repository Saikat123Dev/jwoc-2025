import { UserService } from '@/services/UserService';
import { AppError } from '@/middleware/errorHandler';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe('register', () => {
    it('should throw error for duplicate email', async () => {
      const userData = {
        handle: 'testuser',
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      // Mock repository to simulate existing user
      const mockUserRepository = {
        findByEmail: jest.fn().mockResolvedValue({ id: '1' }),
        findByHandle: jest.fn().mockResolvedValue(null),
        create: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
        getFollowerCount: jest.fn(),
        getFollowingCount: jest.fn(),
        getPostCount: jest.fn(),
      };

      userService = new UserService(mockUserRepository as any);

      await expect(userService.register(userData)).rejects.toThrow(AppError);
    });
  });
});