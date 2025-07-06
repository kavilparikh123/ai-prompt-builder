"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import PromptCard from "./_components/PromptCard";

export default function HomePage() {
  const router = useRouter();
  const { data: prompts, isLoading } = api.prompt.getAll.useQuery();

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🧠 Prompt Library</h1>
        <button
          onClick={() => router.push("/builder")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
        >
          ➕ New Prompt
        </button>
      </div>

      {isLoading ? (
        <p>Loading prompts...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {prompts?.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      )}
    </main>
  );
}
