import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { usersTable, decksTable, cardsTable } from './db/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection by selecting from users table
    const users = await db.select().from(usersTable);
    console.log('✅ Database connection successful!');
    console.log('Current users in database:', users);
    
    // Example: Create a test user
    const testUser = {
      name: 'Test User',
      age: 25,
      email: 'test@example.com',
    };
    
    console.log('Creating test user...');
    await db.insert(usersTable).values(testUser);
    console.log('✅ Test user created successfully!');
    
    // Verify the user was created
    const newUsers = await db.select().from(usersTable);
    console.log('All users after insert:', newUsers);
    
    // Clean up test user
    await db.delete(usersTable).where(eq(usersTable.email, testUser.email));
    console.log('✅ Test user cleaned up!');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

main();
