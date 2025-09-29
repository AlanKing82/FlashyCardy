import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Home() {
  const { userId } = await auth()
  
  // Redirect logged-in users to dashboard
  if (userId) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold text-foreground">
          FlashyCardy
        </h1>
        <p className="text-xl text-muted-foreground">
          Your personal flashcard platform
        </p>
        <SignedOut>
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Get Started</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 justify-center">
                <SignInButton mode="modal">
                  <Button variant="outline" className="flex-1">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="flex-1">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </CardContent>
          </Card>
        </SignedOut>
      </div>
    </main>
  )
}
