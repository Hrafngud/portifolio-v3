"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "@/lib/pocketbase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Article } from "@/components/types"; // Correct import for Article type

export function ArticleForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      // Explicitly define the type for articleData
      const articleData: Omit<Article, "id" | "created"> = {
        title_en: formData.get("title_en") as string,
        title_pt: formData.get("title_pt") as string,
        content_en: formData.get("content_en") as string,
        content_pt: formData.get("content_pt") as string,
      };

      await createArticle(articleData);
      e.currentTarget.reset();
      router.refresh();
      toast.success("Article created successfully!");
    } catch (error) {
      console.error("Error creating article:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create article");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Add New Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title_en">Title (English)</Label>
          <Input id="title_en" name="title_en" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title_pt">Title (Portuguese)</Label>
          <Input id="title_pt" name="title_pt" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content_en">Content (English)</Label>
          <Textarea id="content_en" name="content_en" required className="min-h-[200px]" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content_pt">Content (Portuguese)</Label>
          <Textarea id="content_pt" name="content_pt" required className="min-h-[200px]" />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Article"}
        </Button>
      </form>
    </Card>
  );
}
