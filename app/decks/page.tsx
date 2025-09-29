import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getDecksByUserId } from "@/src/db/queries"

export default async function Decks() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  const decks = await getDecksByUserId(userId);

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Decks</h1>
          <p className="text-muted-foreground">Here you can manage all your flashcard decks.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {decks.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No Decks Found</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Create your first deck to get started!</p>
              </CardContent>
            </Card>
          ) : (
            decks.map(deck => (
              <Card key={deck.id} className="flex flex-col justify-between">
                <CardHeader>
                  <CardTitle>{deck.name}</CardTitle>
                  <div className="text-xs text-muted-foreground">{new Date(deck.createdAt).toLocaleDateString()}</div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">{deck.description || "No description"}</p>
                  <Link href={`/decks/${deck.id}/study`} passHref legacyBehavior>
                    <a>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Study</button>
                    </a>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
