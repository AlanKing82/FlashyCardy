import { db } from '@/src/db';
import { cardsTable } from '@/src/db/schema';

export async function createCard({ deckId, front, back }: { deckId: number; front: string; back: string }) {
  const [newCard] = await db.insert(cardsTable).values({ deckId, front, back }).returning();
  return newCard;
}
