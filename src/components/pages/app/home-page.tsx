/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6Vl76q83WAm
 */
'use client';

import { PostItem } from "@/components/post-item";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { User } from "next-auth"
import Link from "next/link"
import { useEffect, useState } from "react"

type Post = {
  id: string;
  title: string;
  content: string;
  name: string;
  email: string;
  image: string;
};

export default function HomePage({
  user
}: {
  user: Pick<User, "email" | "name" | "image">
}) {

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/community')
      .then(response => response.json())
      .then(json => {
        if (json) {
          setPosts(json);
          setLoading(false);
        }
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="container min-h-screen mx-auto px-4 md:px-6 py-8 space-y-8">
      <section className="space-y-4 my-2">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={user.image || "/fallback.png"} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link className="text-blue-500" href="/app/chat">
            <Card>
              <CardHeader>
                <CardTitle>Lazy AI Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Engage in AI-powered discussions to solve your doubts & queries instantly!</p>
              </CardContent>
            </Card>
          </Link>
          <Link className="text-blue-500" href="/app/notes">
            <Card>
              <CardHeader>
                <CardTitle>Lazy Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Take notes quickly and easily, and if wanna write quickly use our Lazy AI.</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
      <section className="space-y-6">
        <div className="flex flex-1 flex-col gap-4 p-y-4 md:gap-8 md:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Community</h2>
            <Link href="/app/community/create">
              <Button >Post Doubt</Button>
            </Link>
          </div>
          {loading ? (
            <div className="w-full h-36 flex items-center justify-center">
              <Loader2 className={cn("animate-spin w-12 h-12", { hidden: !loading })} />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 grid-cols-1 gap-y-4 gap-x-0 md:gap-x-3">
              {
                posts && posts.map((post, index) => (
                  <PostItem post={post} key={index} />
                ))
              }
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

