"use client";

import { useRouter } from "next/navigation";
import type { RouterOutputs } from "~/trpc/shared";

type Prompt = RouterOutputs["prompt"]["getAll"][number];
import { api } from "~/trpc/react";

export default function PromptCard({ prompt }: { prompt: Prompt }) {
  const router = useRouter();
  const utils = api.useUtils();
  const deletePrompt = api.prompt.delete.useMutation({
    onSuccess: () => utils.prompt.getAll.invalidate(),
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this prompt?")) {
      deletePrompt.mutate({ id: prompt.id });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
      <h2 className="text-xl font-semibold">{prompt.title}</h2>
      <p className="text-gray-600 mt-2 line-clamp-3">{prompt.body}</p>
      <div className="mt-4 flex gap-2">
        <button onClick={() => router.push(`/builder?id=${prompt.id}`)}>✏️ Edit</button>
        <button onClick={() => router.push(`/chat/${prompt.id}`)}>💬 Chat</button>
        <button onClick={handleDelete} className="text-red-600 hover:underline">🗑 Delete</button>
      </div>
    </div>
  );
}
