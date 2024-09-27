"use client";

import React, { useEffect, useRef } from "react";

interface Message {
  id: string;
  text: string;
  userId: string;
  username: string;
  createdAt: string;
}

interface MessageBoxProps {
  messages: Message[];
  currentUsername: string;
}

export default function MessageBox({
  messages,
  currentUsername,
}: MessageBoxProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-full space-y-4 overflow-y-auto max-h-full">
      {messages.map((msg) => {
        const isCurrentUser = msg.username === currentUsername;
        return (
          <div key={msg.id} className={`flex p-2 ${isCurrentUser ? "" : ""}`}>
            <div
              className={`max-w-[70%] rounded-lg p-2 ${
                isCurrentUser ? "border" : "border"
              }`}
            >
              <p
                className={`font-bold text-xs ${
                  isCurrentUser ? "text-red-700" : ""
                }`}
              >
                {msg.username}
              </p>
              <p className="break-words">{msg.text}</p>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
