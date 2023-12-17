import { Footer } from "@/components/footer";
import CommunityHomePage from "@/components/pages/community/community-home-page";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";


export const metadata = {
  title: "Community | Lazy Learning",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <CommunityHomePage user={user} />
      <Footer />
    </>
  )
}
