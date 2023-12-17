/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6Vl76q83WAm
 */
'use client';

import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { User } from "next-auth"
import Link from "next/link";
import { useEffect, useState } from "react"

type Post = {
  id: string;
  title: string;
  content: string;
  name: string;
  email: string;
  image: string;
};

export default function CommunityHomePage({
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
      </section>
      <section className="space-y-6">
        <div className="flex flex-1 flex-col gap-4 p-y-4 md:gap-8 md:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Community Posts</h2>
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
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="mb-0 flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src={post.image} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <p className="text-lg">{post.title}</p>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <span className="font-bold">Question:</span> {post.content}
                      </p>
                      <p>
                        <span className="font-bold mt-3">Asked By:</span> {post.name}
                      </p>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

