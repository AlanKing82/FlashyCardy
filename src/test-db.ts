import { getUserByEmail, createUser, deleteUser } from '@/src/db/queries';

async function main() {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection by selecting from users table using query helper
    const users = await getUserByEmail('test@example.com');
    console.log('✅ Database connection successful!');
    console.log('Current users in database:', users);

    // Example: Create a test user
    const testUser = {
      name: 'Test User',
      age: 25,
      email: 'test@example.com',
    };

    console.log('Creating test user...');
    await createUser(testUser);
    console.log('✅ Test user created successfully!');

    // Verify the user was created
    const newUsers = await getUserByEmail(testUser.email);
    console.log('All users after insert:', newUsers);

    // Clean up test user
    await deleteUser(testUser.email);
    console.log('✅ Test user cleaned up!');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

main();
