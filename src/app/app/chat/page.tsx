import ChatPage from "@/components/pages/chat/chat-page";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";


export const metadata = {
  title: "Chat | Lazy Learning",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <ChatPage user={user} />
    </>
  )
}
