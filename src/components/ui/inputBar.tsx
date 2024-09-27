"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

interface InputBarProps {
  onSubmit: (message: string) => void;
}

export default function InputBar({ onSubmit }: InputBarProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full flex items-center p-2"
    >
      <Input
        placeholder="Type a message..."
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="flex-grow mr-2"
      />
      <Button type="submit" size="icon">
        <PaperPlaneIcon />
      </Button>
    </form>
  );
}
