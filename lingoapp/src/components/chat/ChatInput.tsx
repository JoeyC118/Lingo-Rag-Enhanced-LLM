import { useState } from "react";
import { Send, Plus, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
}

export function ChatInput({ onSend, placeholder = "Type your message or paste text to translate..." }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center gap-2 p-2 bg-secondary rounded-2xl border border-border shadow-input transition-shadow focus-within:shadow-medium">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="flex-shrink-0 h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-background"
        >
          <Plus className="w-5 h-5" />
        </Button>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground py-2 px-1"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="flex-shrink-0 h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-background"
        >
          <Mic className="w-5 h-5" />
        </Button>

        <Button
          type="submit"
          size="icon"
          disabled={!message.trim()}
          className={cn(
            "flex-shrink-0 h-10 w-10 rounded-xl transition-all",
            message.trim()
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-muted-foreground"
          )}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}
