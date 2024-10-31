"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RenderMessage } from "@/components/ai-markdown";
import { User } from "next-auth";
import { Textarea } from "@/components/ui/textarea";

type Message = {
  user: "user" | "bot";
  text: string;
  timestamp: number;
};

export default function ChatPage({
  user,
}: {
  user: Pick<User, "email" | "name" | "image">;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const mainSectionRef = useRef<HTMLDivElement>(null);

  // Scroll To Bottom
  const scrollToBottom = useCallback(() => {
    if (!mainSectionRef.current) return;
    console.log(loading ? "smooth" : "instant");
    const target = mainSectionRef.current;
    target.scroll({
      top: target.scrollHeight,
      behavior: loading ? "smooth" : "instant",
    });
  }, [mainSectionRef, loading]);

  // Chat Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (loading) return;
    setLoading(true);
    e.preventDefault();
    if (prompt.trim() === "") {
      toast.error("Please enter your doubt!");
      return;
    }

    const message: Message = {
      user: "user",
      text: prompt,
      timestamp: Date.now(),
    };
    let newMessages = [...messages, message];

    setMessages(newMessages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: prompt }),
      });

      // stream response
      const reader = response.body?.getReader();
      toast.success("Message submitted!");

      if (!reader) return;

      // read response
      let done = false;
      let value = "";
      let botMessage: Message = {
        user: "bot",
        text: "",
        timestamp: Date.now(),
      };
      newMessages = [...newMessages, botMessage];
      setMessages(newMessages);
      while (!done) {
        const { done: _done, value: _value } = await reader.read();
        done = _done;
        value += new TextDecoder().decode(_value);
        console.log("value", value);
        setTimeout(() => {
          // find last message and check timestamp as well
          const lastMessage = newMessages[newMessages.length - 1];
          if (
            lastMessage.user === "bot" &&
            lastMessage.timestamp === botMessage.timestamp
          ) {
            botMessage.text = value;
            setMessages(newMessages);
          }
        }, 50);
      }

      botMessage.text = value;
      setMessages(newMessages);

      setPrompt("");
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
      setPrompt("");
      setMessages(messages.slice(0, -1));
      setLoading(false);
    }
  };

  // Chat Fetch from Local Storage
  useEffect(() => {
    const messages = localStorage.getItem("messages");
    if (messages) {
      setMessages(JSON.parse(messages));
    }
  }, []);

  // Chat Save to Local Storage
  useEffect(() => {
    if (messages.length === 0) return;

    const debouncedSave = setTimeout(() => {
      localStorage.setItem("messages", JSON.stringify(messages));
    }, 1000);

    return () => clearTimeout(debouncedSave);
  }, [messages]);

  // Auto scroll to bottom of main section when messages change
  useEffect(() => {
    const observer = new MutationObserver(() => {
      scrollToBottom();
    });

    if (mainSectionRef.current) {
      observer.observe(mainSectionRef.current, {
        childList: true,
        subtree: true,
      });
    }

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, [scrollToBottom]);

  return (
    <div
      style={{
        height: "calc(100vh - 57px)",
      }}
      className="w-full flex flex-col items-center bg-gray-100 dark:bg-gray-900"
    >
      <Toaster position="bottom-left" reverseOrder={false} />
      <div
        className="flex flex-grow w-full overflow-auto p-6"
        ref={mainSectionRef}
      >
        <main className="flex flex-col gap-6 w-full m-auto">
          {messages &&
            messages.map((message, index) => {
              if (message.user === "user") {
                return (
                  <Card key={index} className="p-4 space-y-4 dark:bg-gray-950">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            alt={user.name || "User"}
                            src={user.image || "/fallback.png"}
                          />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">You</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-200">
                        {message.text}
                      </p>
                    </CardContent>
                  </Card>
                );
              } else {
                return (
                  <Card
                    key={index}
                    className="p-4 space-y-4 bg-gray-50 dark:bg-gray-950"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage alt="LZI" src="/logo.png" />
                          <AvatarFallback>LZI</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">Lazy AI</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <RenderMessage>{message.text}</RenderMessage>
                    </CardContent>
                  </Card>
                );
              }
            })}
        </main>
      </div>
      <div className="w-full p-6 shadow-md bg-white dark:bg-gray-950">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <Textarea
              rows={1}
              disabled={loading}
              className="flex-grow"
              placeholder="Type your doubt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button disabled={loading} variant="outline" type="submit">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
