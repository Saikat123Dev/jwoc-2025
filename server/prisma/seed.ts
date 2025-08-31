import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Starting database seed...');

  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        handle: 'alice_dev',
        name: 'Alice Developer',
        email: 'alice@example.com',
        bio: 'Full-stack developer passionate about TypeScript and React',
      },
    }),
    prisma.user.create({
      data: {
        handle: 'bob_designer',
        name: 'Bob Designer',
        email: 'bob@example.com',
        bio: 'UI/UX designer who loves creating beautiful user experiences',
      },
    }),
    prisma.user.create({
      data: {
        handle: 'charlie_pm',
        name: 'Charlie Product Manager',
        email: 'charlie@example.com',
        bio: 'Product manager focused on building products that users love',
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create follow relationships
  await prisma.follow.createMany({
    data: [
      { followerId: users[0].id, followeeId: users[1].id },
      { followerId: users[0].id, followeeId: users[2].id },
      { followerId: users[1].id, followeeId: users[2].id },
      { followerId: users[2].id, followeeId: users[0].id },
    ],
  });

  console.log('✅ Created follow relationships');

  // Create sample posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        authorId: users[0].id,
        body: 'Just finished building an amazing TypeScript backend! 🚀 The type safety is incredible.',
        visibility: 'PUBLIC',
      },
    }),
    prisma.post.create({
      data: {
        authorId: users[1].id,
        body: 'Working on a new design system. Color theory is fascinating! 🎨',
        visibility: 'PUBLIC',
      },
    }),
    prisma.post.create({
      data: {
        authorId: users[2].id,
        body: 'User feedback is the most valuable product input. Always listen to your users! 👂',
        visibility: 'PUBLIC',
      },
    }),
    prisma.post.create({
      data: {
        authorId: users[0].id,
        body: 'Private thoughts on the new architecture...',
        visibility: 'PRIVATE',
      },
    }),
  ]);

  console.log(`✅ Created ${posts.length} posts`);

  // Create reactions
  await prisma.reaction.createMany({
    data: [
      { userId: users[1].id, postId: posts[0].id, type: 'LIKE' },
      { userId: users[2].id, postId: posts[0].id, type: 'LOVE' },
      { userId: users[0].id, postId: posts[1].id, type: 'LIKE' },
      { userId: users[2].id, postId: posts[1].id, type: 'LOVE' },
      { userId: users[0].id, postId: posts[2].id, type: 'LIKE' },
      { userId: users[1].id, postId: posts[2].id, type: 'LIKE' },
    ],
  });

  console.log('✅ Created reactions');

  // Create comments
  await prisma.comment.createMany({
    data: [
      {
        postId: posts[0].id,
        authorId: users[1].id,
        body: 'Totally agree! TypeScript has changed the game for us.',
      },
      {
        postId: posts[0].id,
        authorId: users[2].id,
        body: 'Would love to see the architecture details!',
      },
      {
        postId: posts[1].id,
        authorId: users[0].id,
        body: 'The color palette looks amazing. Great work!',
      },
      {
        postId: posts[2].id,
        authorId: users[1].id,
        body: 'So true! User-centered design is everything.',
      },
    ],
  });

  console.log('✅ Created comments');

  // Create feed items for users
  for (const user of users) {
    const userPosts = posts.filter(post => 
      post.visibility === 'PUBLIC' || 
      (post.visibility === 'FOLLOWERS' && users.some(u => u.id === post.authorId)) ||
      (post.visibility === 'PRIVATE' && post.authorId === user.id)
    );

    const feedItems = userPosts.map((post, index) => ({
      userId: user.id,
      postId: post.id,
      rank: Math.random() * 100, // Random ranking for demo
    }));

    await prisma.feedItem.createMany({
      data: feedItems,
    });
  }

  console.log('✅ Created feed items');

  // Create sample notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: users[0].id,
        type: 'FOLLOW',
        title: 'New Follower',
        message: 'Charlie Product Manager started following you',
      },
      {
        userId: users[0].id,
        type: 'LIKE',
        title: 'Post Liked',
        message: 'Bob Designer liked your post',
      },
      {
        userId: users[1].id,
        type: 'COMMENT',
        title: 'New Comment',
        message: 'Alice Developer commented on your post',
      },
    ],
  });

  console.log('✅ Created notifications');

  console.log('🎉 Database seeded successfully!');
  console.log('\n📊 Summary:');
  console.log(`   • ${users.length} users created`);
  console.log(`   • ${posts.length} posts created`);
  console.log('   • 6 reactions created');
  console.log('   • 4 comments created');
  console.log('   • 4 follow relationships created');
  console.log('   • Feed items and notifications created');
  console.log('\n🚀 Ready to test the API!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });