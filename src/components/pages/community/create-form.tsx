"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
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
  title: string
  content: string
}

export function CommunityCreateForm({ className, user, ...props }: {
  className?: string;
  user: Pick<User, "email" | "name" | "image">
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostSchema>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter()
  const { toast } = useToast();

  async function onSubmit(data: FormData) {
    const dataToSubmit = {
      ...data,
      email: user.email,
    };
    setIsLoading(true)

    const createPostResult = await fetch("/api/community", {
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
        description: "We could not create your post. Please try again.",
        variant: "destructive",
      });
    }

    toast({
      title: "Congratulations!",
      description: "We have posted your doubt to the community.",
    });

    router.push("/app/community");

  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="title">
              Title
            </Label>
            <Input
              id="title"
              placeholder="What is your doubt?"
              type="text"
              autoCapitalize="none"
              autoComplete="title"
              autoCorrect="off"
              disabled={isLoading}
              {...register("title")}
            />
            {errors?.title && (
              <p className="px-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
            <Textarea
              id="content"
              placeholder="Explain your doubt in detail"
              autoCapitalize="none"
              autoComplete="content"
              autoCorrect="off"
              disabled={isLoading}
              {...register("content")}
            />
            {errors?.content && (
              <p className="px-1 text-sm text-red-600">
                {errors.content.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Post your doubt
          </button>
        </div>
      </form>
    </div>
  )
}
