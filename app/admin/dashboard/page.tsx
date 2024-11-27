"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPocketBase } from "@/lib/pocketbase"; // Use the correct import for PocketBase
import { Dashboard } from "@/components/admin/dashboard";

export default function DashboardPage() {
  const router = useRouter();
  const pb = createPocketBase(); // Create a fresh PocketBase instance
  const [isValid, setIsValid] = useState(pb.authStore.isValid); // Track authentication status

  useEffect(() => {
    if (!isValid) {
      router.push("/admin");
    }
  }, [isValid, router]);

  if (!isValid) return null; // Avoid rendering if the user isn't authenticated

  return <Dashboard />;
}
