import { db } from "../index";
import { decksTable } from "../schema";
import { eq, desc } from "drizzle-orm";

export async function getDecksByUserId(userId: string) {
  return await db.select().from(decksTable).where(eq(decksTable.userId, userId)).orderBy(desc(decksTable.createdAt));
}
