import { Metadata } from "next"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/user-auth-form"
import { BrainIcon, ChevronLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Login | Down Drift",
  description: "Login to your account to access your favorite features of Down Drift!",
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center items-center">
          {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
          <BrainIcon className="mx-auto h-12 w-12" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to continue with your account
          </p>
        </div>
        <UserAuthForm formType="login" />
        {/* <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p> */}
      </div>
    </div>
  )
}
