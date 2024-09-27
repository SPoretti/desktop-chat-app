"use client";

import { useState } from "react";
import { SignInForm } from "@/components/ui/signInForm";
import { useRouter } from "next/navigation";
import { signIn } from "../../../firebase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      router.push("/verify-email");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <main className="w-full h-full flex justify-center items-center">
      <SignInForm
        handleSubmit={handleSubmit}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
      />
    </main>
  );
}
