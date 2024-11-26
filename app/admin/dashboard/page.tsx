"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dashboard } from "@/components/admin/dashboard";
import { createPocketBase } from "@/lib/pocketbase";

export default function DashboardPage() {
  const pb = createPocketBase(); // Creates a fresh PocketBase instance
  const router = useRouter();

  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push("/admin");
    }
  }, [pb, router]);

  return <div>Welcome to the Dashboard</div>;
}
