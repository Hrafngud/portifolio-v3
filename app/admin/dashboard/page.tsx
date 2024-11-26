"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { pb } from "@/lib/pocketbase";
import { Dashboard } from "@/components/admin/dashboard";

export default function DashboardPage() {
  const pb = createPocketBase(); // Instantiate the PocketBase instance
  const router = useRouter();

  useEffect(() => {
    if (!pb.authStore.isValid) { // Access the authStore via the pb instance
      router.push("/admin");
    }
  }, [pb, router]);

  return <Dashboard />;
}
