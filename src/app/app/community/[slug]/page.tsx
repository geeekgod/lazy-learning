import { BackButton } from "@/components/back-button";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const fetchPost = async (slug: string) => {
  const {
    data: post,
  } = await supabase.from("posts").select("*").eq("id", slug).single();

  return post;
}


export default async function Page({ params }: { params: { slug: string } }) {

  const post = await fetchPost(params.slug);

  if (!post) {
    // redirect("/404");
    return (
      <div>
        <div className="py-4 flex items-center">
          <BackButton />
        </div>
        <h1>Post not Found!</h1>
      </div>
    )
  }

  return (
    <div>
      <div className="py-4 flex items-center">
        <BackButton />
      </div>
      <Card>
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
    </div>
  )
}
