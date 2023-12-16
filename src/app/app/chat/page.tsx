// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/XQmlH6KQWTk
//  */
'use client';

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RenderMessage } from "@/components/ai-markdown";

type Message = {
  user: "user" | "bot";
  text: string;
  timestamp: number;
}

export default function Page() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const mainSectionRef = useRef<HTMLDivElement>(null);

  // Chat Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (loading) return;
    setLoading(true);
    e.preventDefault();
    if (prompt.trim() === '') {
      toast.error("Please enter your doubt!");
      return;
    };

    const message: Message = {
      user: "user",
      text: prompt,
      timestamp: Date.now()
    }
    let newMessages = [...messages, message];

    setMessages(newMessages);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: prompt })
      });

      // stream response
      const reader = response.body?.getReader();
      toast.success("Message submitted!");

      if (!reader) return;

      // read response
      let done = false;
      let value = '';
      while (!done) {
        const { done: _done, value: _value } = await reader.read();
        done = _done;
        value += new TextDecoder().decode(_value);
      }

      const botMessage: Message = {
        user: "bot",
        text: value,
        timestamp: Date.now()
      }
      newMessages = [...newMessages, botMessage];
      setMessages(newMessages);

      setPrompt('');
      setLoading(false);
    }
    catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
      setPrompt('');
      setMessages(messages.slice(0, -1));
      setLoading(false);
    }

  }

  // Chat Fetch from Local Storage
  useEffect(() => {
    const messages = localStorage.getItem('messages');
    if (messages) {
      setMessages(JSON.parse(messages));
    }
  }, []);

  // Chat Save to Local Storage
  useEffect(() => {
    if (messages.length === 0) return;

    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  // Auto scroll to bottom of main section when messages change
  useEffect(() => {
    if (mainSectionRef.current) {
      mainSectionRef.current.scrollTop = mainSectionRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      style={{
        height: "calc(100vh - 57px)"
      }}
      className="w-full flex flex-col items-center bg-gray-100 dark:bg-gray-900">
      <Toaster
        position="bottom-left"
        reverseOrder={false}
      />
      <div className="flex flex-grow w-full overflow-auto p-6" ref={mainSectionRef}>
        <main className="flex flex-col gap-6 w-full m-auto">
          {
            messages && messages.map((message, index) => {

              if (message.user === "user") {
                return (
                  <Card key={index} className="p-4 space-y-4 dark:bg-gray-950">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage alt="User" src="/placeholder-avatar.jpg" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">User</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-200">{message.text}</p>
                    </CardContent>
                  </Card>
                )
              }
              else {
                return (
                  <Card key={index} className="p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage alt="LZI" src="/placeholder-avatar.jpg" />
                          <AvatarFallback>LZI</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">Lazy AI</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* <p className="text-gray-600">{message.text}</p> */}
                      <RenderMessage>{message.text}</RenderMessage>
                    </CardContent>
                  </Card>
                )
              }

            })

          }

        </main>
      </div>
      <div className="w-full p-6 shadow-md bg-white dark:bg-gray-950">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <Input disabled={loading} className="flex-grow" placeholder="Type your doubt here..." value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            <Button disabled={loading} variant="outline" type="submit">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
