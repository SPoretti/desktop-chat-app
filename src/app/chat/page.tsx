"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, sendMessage, listenForMessages } from "../../../firebase";
import InputBar from "@/components/ui/inputBar";
import MessageBox from "@/components/ui/messageBox";
import { useUser } from "@/components/UserContext";

export default function Chat() {
  interface Message {
    id: string;
    text: string;
    userId: string;
    username: string;
    createdAt: string;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/sign-in");
      } else if (!user.emailVerified) {
        router.push("/verify-email");
      }
    }
  }, [user, loading, router]);

  useEffect(() => {
    const unsubscribe = listenForMessages(setMessages);
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (message: string) => {
    const currentUser = auth.currentUser;
    if (currentUser && user) {
      try {
        await sendMessage(message, currentUser.uid);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.warn("User is not authenticated");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentUsername = user ? user.username : "";

  return (
    <div className="h-[calc(100vh-40px)] w-full flex items-center justify-center p-4">
      <div className="h-full w-full max-w-4xl border rounded-lg shadow-md flex flex-col">
        <div className="flex-grow overflow-hidden">
          <MessageBox messages={messages} currentUsername={currentUsername} />
        </div>
        <div className="h-16 w-full border-t">
          <InputBar onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
