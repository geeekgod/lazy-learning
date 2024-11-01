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
  id?: string;
  userId?: string;
  user: "user" | "bot";
  message: string;
  timestamp: number;
};

export default function ChatPage({
  user,
  chats,
}: {
  user: Pick<User, "email" | "name" | "image">;
  chats: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(chats);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const mainSectionRef = useRef<HTMLDivElement>(null);

  // Scroll To Bottom
  const scrollToBottom = useCallback(() => {
    if (!mainSectionRef.current) return;
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
      message: prompt,
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

      if (!reader) return;

      // read response
      let done = false;
      let value = "";
      let botMessage: Message = {
        user: "bot",
        message: "",
        timestamp: Date.now(),
      };
      newMessages = [...newMessages, botMessage];
      setMessages(newMessages);
      while (!done) {
        const { done: _done, value: _value } = await reader.read();
        done = _done;
        value += new TextDecoder().decode(_value);
        if (value === "Rate Limited!") {
          setMessages(messages.slice(0, -1));
          toast.error("Rate limited! Please try again later.");
          break;
        }
        setTimeout(() => {
          // find last message and check timestamp as well
          const lastMessage = newMessages[newMessages.length - 1];
          if (
            lastMessage.user === "bot" &&
            lastMessage.timestamp === botMessage.timestamp
          ) {
            botMessage.message = value;
            setMessages(newMessages);
          }
        }, 50);
      }

      botMessage.message = value;
      setMessages(newMessages);
    } catch (error) {
      // check if status is 429
      if (error instanceof Response && error.status === 429)
        toast.error("Rate limited! Please try again later.");
      else toast.error("Something went wrong!");
      console.error(error);
      setMessages(messages.slice(0, -1));
    } finally {
      setPrompt("");
      setLoading(false);
    }
  };

  // Chat Fetch from Local Storage
  useEffect(() => {
    // const messages = localStorage.getItem("messages");
    // if (messages) {
    //   setMessages(JSON.parse(messages));
    // }
    const fetchMessages = async () => {
      const response = await fetch("/api/chats");
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    };
    fetchMessages();
  }, []);

  // // Chat Save to Local Storage
  // useEffect(() => {
  //   if (messages.length === 0) return;

  //   const debouncedSave = setTimeout(() => {
  //     localStorage.setItem("messages", JSON.stringify(messages));
  //   }, 1000);

  //   return () => clearTimeout(debouncedSave);
  // }, [messages]);

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
                        {message.message}
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
                      <RenderMessage>{message.message}</RenderMessage>
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
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  handleSubmit(
                    e as unknown as React.FormEvent<HTMLFormElement>
                  );
                }
              }}
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
