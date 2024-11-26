"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { pb } from "@/lib/pocketbase";
import { LoginForm } from "@/components/admin/login-form";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    if (pb.authStore.isValid) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
