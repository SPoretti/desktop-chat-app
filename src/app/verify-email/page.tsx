"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebase";
import { sendEmailVerification } from "firebase/auth";
import { Button } from "@/components/ui/button";

function VerifyEmailPage() {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkEmailVerification = async () => {
      const user = auth.currentUser;
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          router.push("/chat");
        }
      }
    };

    checkEmailVerification();
  }, [router]);

  const handleResendVerification = async () => {
    const user = auth.currentUser;
    if (user) {
      await user.reload(); // Reload user to get the latest info
      if (user.emailVerified) {
        setMessage("Your email is already verified.");
        return;
      }
      try {
        await sendEmailVerification(user);
        setMessage("Verification email resent. Please check your inbox.");
      } catch (error) {
        setMessage(
          "Failed to resend verification email. Please try again." + error,
        );
      }
    }
  };

  return (
    <main className="w-full h-full flex items-center justify-center">
      <h1 className="font-bold">Verify your email</h1>
      <p>
        A verification email has been sent to your email address. Please check
        your inbox and click the link to verify your email.
      </p>
      <Button onClick={handleResendVerification}>
        Resend verification email
      </Button>
      {message && <p>{message}</p>}
    </main>
  );
}

export default VerifyEmailPage;
