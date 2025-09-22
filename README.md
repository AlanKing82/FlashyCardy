# ⚡ FlashyCardy

**FlashyCardy** is a sleek and modern flashcards app that enables users to sign up, create custom decks and cards, and access premium features through a Pro subscription. It supports full authentication, role-based access control, and SaaS-style billing powered by **Clerk** and **Stripe**.

---

## 🚀 Features

- 🔐 Full user authentication and session management (Clerk)
- 📚 Create and manage flashcard **decks** and **cards**
- 👤 Role-based access control for secure feature gating
- 💳 Stripe-powered Pro plan with billing and subscriptions
- 📱 Responsive, accessible UI with modern design
- 🧠 Built for scalability with a SaaS-style architecture

---

## 🛠️ Tech Stack

| Tool            | Description                                      |
|-----------------|--------------------------------------------------|
| **Next.js 15**  | React framework with App Router & Server Actions |
| **TypeScript**  | Static typing for robust code                    |
| **Tailwind CSS**| Utility-first CSS framework                      |
| **Shadcn UI**   | Accessible and stylish UI components             |
| **Drizzle ORM** | Type-safe SQL and migrations                     |
| **Clerk**       | Auth, user management, and session handling      |
| **Stripe**      | Billing and subscription management              |
| **Neon**        | Serverless PostgreSQL database                   |
| **Cursor AI**   | AI-powered development environment (optional)    |

---

## 📸 Screenshots

> _Coming soon..._

---

## 🧪 Local Development

```bash
# Clone the repo
git clone https://github.com/your-username/flashycardy.git
cd flashycardy

# Install dependencies
pnpm install

# Create your .env file
cp .env.example .env

# Start the dev server
pnpm dev
