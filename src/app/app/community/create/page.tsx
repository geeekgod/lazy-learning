import { Footer } from "@/components/footer";
import { CommunityCreateForm } from "@/components/pages/community/create-form";
import { Toaster } from "@/components/ui/toaster";
import { getCurrentUser } from "@/lib/session";
import { BrainIcon } from "lucide-react";
import { redirect } from "next/navigation";


export const metadata = {
  title: "Post your doubt | Lazy Learning",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <Toaster />
      <div className="container flex h-[95vh] w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center items-center">
            <BrainIcon className="mx-auto h-12 w-12" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Post your doubt here
            </h1>
            <p className="text-sm text-muted-foreground">
              Ask your doubt to the community and get answers
            </p>
          </div>
          <CommunityCreateForm user={user} />
        </div>
      </div>
      <Footer />
    </>
  )
}
