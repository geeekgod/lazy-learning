"use client"

import * as React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { User } from "next-auth"
import { useRouter } from "next/navigation"


type PostSchema = {
  comment: string
}

export function PostComment({ className, user, postId, ...props }: {
  className?: string;
  user: Pick<User, "email" | "name" | "image">
  postId: string
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostSchema>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter()
  const { toast } = useToast();

  const onSubmit: SubmitHandler<PostSchema> = async (data) => {
    const dataToSubmit = {
      ...data,
      email: user.email,
      postId: postId,
    };
    setIsLoading(true)

    const createPostResult = await fetch("/api/community/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSubmit),
    });

    setIsLoading(false)

    if (createPostResult.status == 400) {
      return toast({
        title: "Something went wrong.",
        description: "Please check your inputs and try again.",
        variant: "destructive",
      });
    }

    if (createPostResult.status != 200) {
      return toast({
        title: "Something went wrong.",
        description: "We could not create your comment. Please try again.",
        variant: "destructive",
      });
    }

    toast({
      title: "Congratulations!",
      description: "We have posted your answer to the following question.",
    });

    router.refresh();
    reset();

  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="title">
              Title
            </Label>
            <Textarea
              id="content"
              placeholder="Explain your answer in detail"
              autoCapitalize="none"
              autoComplete="content"
              autoCorrect="off"
              disabled={isLoading}
              {...register("comment")}
            />
            {errors?.comment && (
              <p className="px-1 text-sm text-red-600">
                {errors.comment.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Post your answer
          </button>
        </div>
      </form>
    </div>
  )
}
