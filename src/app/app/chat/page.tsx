import ChatPage from "@/components/pages/chat/chat-page";
import { getChatsByUser } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Chat | Lazy Learning",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const chats = await getChatsByUser(user.id);

  return (
    <>
      <ChatPage user={user} chats={chats ?? []} />
    </>
  );
}
