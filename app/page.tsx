import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"

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
          <div className="flex gap-4 justify-center">
            <SignInButton mode="modal">
              <Button variant="outline">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>
    </main>
  )
}
