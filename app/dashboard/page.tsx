import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your flashcard dashboard</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold text-card-foreground">My Decks</h2>
            <p className="text-sm text-muted-foreground">Manage your flashcard decks</p>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold text-card-foreground">Study Progress</h2>
            <p className="text-sm text-muted-foreground">Track your learning progress</p>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold text-card-foreground">Recent Activity</h2>
            <p className="text-sm text-muted-foreground">Your latest study sessions</p>
          </div>
        </div>
      </div>
    </div>
  )
}
