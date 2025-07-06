"use client";

import { useState } from "react";
import type { RouterOutputs } from "~/trpc/shared";

type Prompt = RouterOutputs["prompt"]["getAll"][number];

export default function PromptForm({
  initialData,
  onSave,
}: {
  initialData?: Prompt;
  onSave: (data: { title: string; body: string }) => void;
}) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [body, setBody] = useState(initialData?.body ?? "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ title, body });
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          className="mt-1 block w-full border rounded-lg p-2 border-gray-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Prompt Text
        </label>
        <textarea
          className="mt-1 block w-full border rounded-lg p-2 border-gray-300"
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        💾 Save Prompt
      </button>
    </form>
  );
}
