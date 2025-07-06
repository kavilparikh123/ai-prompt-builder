"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PromptForm from "../_components/PromptForm";
import { api } from "~/trpc/react";

export default function BuilderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const isEditing = Boolean(id);

  const { data, isLoading } = api.prompt.getById.useQuery(
    { id: id ?? "" },
    { enabled: isEditing }
  );

  const createPrompt = api.prompt.create.useMutation({
    onSuccess: () => router.push("/"),
  });

  const updatePrompt = api.prompt.update.useMutation({
    onSuccess: () => router.push("/"),
  });

  const handleSave = (values: { title: string; body: string }) => {
    if (isEditing && id) {
      updatePrompt.mutate({ id, ...values });
    } else {
      createPrompt.mutate(values);
    }
  };

  if (isEditing && isLoading) {
    return <p className="p-6">Loading prompt...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          {isEditing ? "✏️ Edit Prompt" : "➕ Create Prompt"}
        </h1>
        <PromptForm initialData={data} onSave={handleSave} />
      </div>
    </main>
  );
}
