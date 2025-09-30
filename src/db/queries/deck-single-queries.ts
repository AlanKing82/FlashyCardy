import { db } from "../index";
import { decksTable, cardsTable } from "../schema";
import { eq } from "drizzle-orm";

export async function getDeckById(deckId: number) {
  const deck = await db.select().from(decksTable).where(eq(decksTable.id, deckId)).limit(1);
  return deck[0] || null;
}

export async function getCardsByDeckId(deckId: number) {
  return await db.select().from(cardsTable).where(eq(cardsTable.deckId, deckId));
}
