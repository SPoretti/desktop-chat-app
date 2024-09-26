"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function InputBar() {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setInputValue("");
  };
  return (
    <div className="flex items-center justify-between p-4 border-t w-full h-full">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 w-full h-full"
      >
        <Input
          placeholder="Type..."
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className=""
        />
        <Button type="submit">
          <ArrowRight />
        </Button>
      </form>
    </div>
  );
}
