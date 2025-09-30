"use server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createCard as createCardQuery, getDeckById } from '@/src/db/queries';

const CreateCardSchema = z.object({
  deckId: z.number().positive("Invalid deck ID"),
  front: z.string().min(1, "Front text is required").max(500, "Front text too long"),
  back: z.string().min(1, "Back text is required").max(500, "Back text too long"),
});

export type CreateCardInput = z.infer<typeof CreateCardSchema>;

export async function createCard(input: CreateCardInput) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Validate input
  const validatedData = CreateCardSchema.parse(input);

  // Verify deck ownership using query helper

  // Optionally, you could check deck ownership here if needed
  const deck = await getDeckById(validatedData.deckId);
  if (!deck) {
    throw new Error("Deck not found");
  }

  // Create card using query helper
  const newCard = await createCardQuery({
    deckId: validatedData.deckId,
    front: validatedData.front,
    back: validatedData.back,
  });

  return { success: true, data: newCard };
}
