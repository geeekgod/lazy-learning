import { BackButton } from "@/components/back-button";
import { nextAuthClient, supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getCommentsForPost, getPost } from "@/lib/db";
import { PostComment } from "@/components/pages/community/post-comment";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/footer";

const fetchPost = async (slug: string) => {
  const post = await getPost(slug);
  return post;
}

const fetchComments = async (slug: string) => {
  const comments = await getCommentsForPost(slug);
  return comments;
}


export default async function Page({ params }: { params: { slug: string } }) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login");
  }
  const post = await fetchPost(params.slug);
  const comments = await fetchComments(params.slug);

  if (!post) {
    return (

      <>
        <div className="px-6 min-h-[95vh]">
          <div className="py-4 flex items-center">
            <BackButton />
          </div>
          <h1>Post not Found!</h1>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <div className="px-6 min-h-[95vh]">
        <Toaster />
        <div className="py-4 flex items-center">
          <BackButton />
        </div>
        {/* Post details */}
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
        <div className="my-3">
          <h2 className="text-lg font-bold my-4">Post your Answer:</h2>
          <PostComment user={user} postId={post.id} />
        </div>
        <div className="my-6">
          <h2 className="text-2xl font-bold">Community Replies</h2>
        </div>
        {/* Post comments */}
        <div className="pb-6 grid grid-cols-1 gap-y-2 gap-x-3">
          {
            comments &&
            comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Avatar>
                      <AvatarImage src={comment.image} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p>
                        <span className="font-bold">Answer:</span> {comment.comment}
                      </p>
                      <p>
                        <span className="font-bold mt-3">Answered By:</span> {comment.name}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          }
        </div>

        {
          comments &&
          comments.length == 0 &&
          <div className="my-6 flex items-center w-full h-full">
            <h2 className="text-lg font-bold">No answers yet.</h2>
          </div>
        }
      </div>
      <Footer />
    </>
  )
}
