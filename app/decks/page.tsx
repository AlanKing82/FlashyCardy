import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getDecksByUserId } from "@/src/db/queries"
import { ChevronLeftIcon } from "@/components/ui/chevron-left"

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
          <Link href="/dashboard" passHref legacyBehavior>
            <a className="inline-flex items-center text-blue-600 hover:underline mb-2 text-sm font-medium">
              <ChevronLeftIcon className="mr-1 h-4 w-4" />
              Back to Dashboard
            </a>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mt-2">My Decks</h1>
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
                <Link key={deck.id} href={`/decks/${deck.id}`} passHref legacyBehavior>
                  <a className="block">
                    <Card className="flex flex-col justify-between cursor-pointer hover:shadow-lg transition">
                      <CardHeader>
                        <CardTitle>{deck.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 text-sm text-muted-foreground">{deck.description || "No description"}</p>
                      </CardContent>
                      <div className="px-6 pb-4 pt-4 text-xs text-muted-foreground border-t flex items-center">
                        <span className="self-center">Last updated: {new Date(deck.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </Card>
                  </a>
                </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
