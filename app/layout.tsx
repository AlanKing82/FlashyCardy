import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { Button } from "@/components/ui/button"
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'FlashyCardy',
  description: 'A modern flashcard application',
}

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className="dark">
        <body className={`${poppins.variable} font-sans`}>
          <header className="border-b border-gray-200 dark:border-gray-800 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <h1 className="text-xl font-semibold">FlashyCardy</h1>
              <div className="flex items-center gap-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="ghost">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button>
                      Sign Up
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
