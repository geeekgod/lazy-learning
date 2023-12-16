// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/XQmlH6KQWTk
//  */
'use client';

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { BrainIcon } from "lucide-react"
import { useState } from "react";

type Message = {
  user: "user" | "bot";
  text: string;
  timestamp: number;
}

export default function Page() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message: Message = {
      user: "user",
      text: prompt,
      timestamp: Date.now()
    }

    setMessages([...messages, message]);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: prompt })
    });

    // stream response
    const reader = response.body?.getReader();

    if (!reader) return;

    // read response
    let done = false;
    let value = '';
    while (!done) {
      const { done: _done, value: _value } = await reader.read();
      done = _done;
      value += new TextDecoder().decode(_value);
    }

    console.log("Value", value);

    const botMessage: Message = {
      user: "bot",
      text: value,
      timestamp: Date.now()
    }

    setMessages([...messages, botMessage]);

    setPrompt('');
  }

  console.log(messages);

  return (
    <div className="w-full h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full py-4 px-6 bg-white shadow-md flex items-center justify-between">
        {/* <h1 className="font-bold text-2xl">Lazy Learning</h1> */}
        <Link className="flex items-center justify-center" href="/">
          <BrainIcon className="h-6 w-6" />
          <span className="sr-only">Lazy Learning</span>
        </Link>
        <Button variant="outline">Logout</Button>
      </header>
      <div className="flex flex-grow overflow-auto p-6">
        <main className="flex flex-col gap-6 w-full max-w-xl m-auto">

          {
            messages && messages.map((message, index) => {

              if (message.user === "user") {
                return (
                  <Card key={index} className="p-4 space-y-4">
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
                      <p className="text-gray-600">{message.text}</p>
                    </CardContent>
                  </Card>
                )
              }
              else {
                return (
                  <Card key={index} className="p-4 space-y-4 bg-gray-50">
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
                      <p className="text-gray-600">{message.text}</p>
                    </CardContent>
                  </Card>
                )
              }

            })

          }

        </main>
      </div>
      <div className="w-full p-6 bg-white shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <Input className="flex-grow" placeholder="Type your doubt here..." value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            <Button variant="outline" type="submit">Send</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

