"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPocketBase } from "@/lib/pocketbase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await pb.collection('users').authWithPassword(
        formData.get("email") as string,
        formData.get("password") as string
      );
      router.push("/admin/dashboard");
    } catch (error) {
      setError("Invalid credentials");
    }
  }

  return (
    <Card className="w-full max-w-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        {error && <p className="text-destructive text-sm">{error}</p>}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Card>
  );
}
