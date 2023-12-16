import { Footer } from "@/components/footer";
import HomePage from "@/components/pages/app/home-page";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";


export const metadata = {
  title: "Home | Lazy Learning",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <HomePage user={user} />
      <Footer />
    </>
  )
}
