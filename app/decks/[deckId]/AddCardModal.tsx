"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createCard } from "./card-actions";
import { PlusIcon } from "@/components/ui/plus-icon";
import { Button } from "@/components/ui/button";


interface AddCardModalProps {
  deckId: number;
}

export default function AddCardModal({ deckId }: AddCardModalProps) {
  const [open, setOpen] = useState(false);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const result = await createCard({ deckId, front, back });
        if (result?.success) {
          setOpen(false);
          setFront("");
          setBack("");
          router.refresh();
        } else {
          setError("Failed to add card");
        }
      } catch (err: any) {
        setError(err.message || "Failed to add card");
      }
    });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon className="w-5 h-5 mr-2" />
        Add Card
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 dark:bg-black/80">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">Add Card</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-zinc-900 dark:text-zinc-100">Front</label>
                <input
                  className="w-full border rounded px-3 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700"
                  value={front}
                  onChange={e => setFront(e.target.value)}
                  required
                  disabled={isPending}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-zinc-900 dark:text-zinc-100">Back</label>
                <input
                  className="w-full border rounded px-3 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700"
                  value={back}
                  onChange={e => setBack(e.target.value)}
                  required
                  disabled={isPending}
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" onClick={() => setOpen(false)} disabled={isPending}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>Save</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
