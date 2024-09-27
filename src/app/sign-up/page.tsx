"use client";

import { useState } from "react";
import { SignUpForm } from "@/components/ui/signUpForm";
import { useRouter } from "next/navigation";
import { signUp } from "../../../firebase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, username);
      router.push("/verify-email");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <main className="w-full h-full flex justify-center items-center">
      <SignUpForm
        handleSubmit={handleSubmit}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onUsernameChange={setUsername}
      />
    </main>
  );
}
