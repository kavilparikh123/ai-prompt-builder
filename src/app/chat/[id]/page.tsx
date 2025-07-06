"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "~/trpc/react";

export default function ChatPage() {
  const { id } = useParams();
  const promptId = id as string;

  const { data: prompt, isLoading: loadingPrompt } = api.prompt.getById.useQuery({
    id: promptId,
  });

  const {
    data: history = [],
    refetch: refetchHistory,
    isLoading: loadingHistory,
  } = api.chat.getHistory.useQuery({ promptId });

  const generate = api.chat.generate.useMutation({
    onSuccess: () => {
      refetchHistory(); // reload history from DB
    },
  });

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    generate.mutate({ promptId, message: input });
    setInput("");
  };

  if (loadingPrompt || !prompt) {
    return <p className="p-6">Loading prompt...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">💬 Chat with: {prompt.title}</h1>

      <div className="flex-1 overflow-y-auto border rounded-lg p-4 bg-white space-y-2 mb-4">
        {loadingHistory ? (
          <p>Loading chat...</p>
        ) : (
          history.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-lg p-3 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-100 ml-auto text-right"
                  : "bg-gray-200 mr-auto text-left"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded-lg"
          placeholder="Ask something..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          ➤
        </button>
      </div>
    </main>
  );
}
