"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { pb } from "@/lib/pocketbase";
import { Dashboard } from "@/components/admin/dashboard";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push("/admin");
    }
  }, [router]);

  if (!pb.authStore.isValid) return null;

  return <Dashboard />;
}