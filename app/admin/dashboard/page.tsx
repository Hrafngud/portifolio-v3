"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectForm } from "./project-form";
import { ArticleForm } from "./article-form";
import { Button } from "@/components/ui/button";
import { createPocketBase } from "@/lib/pocketbase"; // Use the function to create the instance

export function Dashboard() {
  const router = useRouter();
  const pb = createPocketBase(); // Dynamically create the PocketBase instance
  const [activeTab, setActiveTab] = useState("projects");

  const handleLogout = () => {
    pb.authStore.clear(); // Clear the authentication store
    router.push("/admin"); // Redirect to the admin page
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <ProjectForm />
        </TabsContent>
        <TabsContent value="articles">
          <ArticleForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
