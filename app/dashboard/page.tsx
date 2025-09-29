import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function Dashboard() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect("/")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your flashcard dashboard</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/decks" passHref legacyBehavior>
            <a style={{ textDecoration: "none" }}>
              <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 hover:border-blue-500/50">
                <CardHeader>
                  <CardTitle>My Decks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Manage your flashcard decks</p>
                </CardContent>
              </Card>
            </a>
          </Link>
          
          <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:scale-105 hover:border-green-500/50">
            <CardHeader>
              <CardTitle>Study Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Track your learning progress</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105 hover:border-purple-500/50">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Your latest study sessions</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
