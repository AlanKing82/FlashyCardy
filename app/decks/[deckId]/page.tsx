


import Link from 'next/link';
import { ChevronLeftIcon } from "@/components/ui/chevron-left";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getDeckById, getCardsByDeckId } from "@/src/db/queries";
import { notFound } from 'next/navigation';
import AddCardModal from "./AddCardModal";

interface DeckPageProps {
  params: { deckId: string };
}

// This is a server component
export default async function DeckPage({ params }: DeckPageProps) {
  const { deckId } = params;
  const deckIdNum = Number(deckId);
  if (isNaN(deckIdNum)) return notFound();

  const deck = await getDeckById(deckIdNum);
  if (!deck) return notFound();

  const cards = await getCardsByDeckId(deckId);

  return (
    <div className="container mx-auto py-8">
      <Link
        href="/decks"
        className="inline-flex items-center text-blue-600 hover:underline mb-4"
      >
        <span className="mr-2">
          <ChevronLeftIcon className="w-5 h-5" />
        </span>
        Back to Decks
      </Link>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{deck.name}</h1>
  <AddCardModal deckId={deckIdNum} />
      </div>
      {deck.description && <p className="mb-6 text-muted-foreground">{deck.description}</p>}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Cards Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Add cards to this deck to get started!</p>
            </CardContent>
          </Card>
        ) : (
          cards.map(card => (
            <Card key={card.id}>
              <CardHeader>
                <CardTitle>{card.front}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{card.back}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
