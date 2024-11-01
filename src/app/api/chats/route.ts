import { getChatsByUser } from "@/lib/db";
import { getApiUser } from "@/lib/session";

export async function GET(req: Request) {
  const user = await getApiUser();

  if (!user || user instanceof Response) {
    return new Response("Unauthorized", { status: 401 });
  }
  // Get the messages for the user
  let chats = await getChatsByUser(user.id);
  if (!chats) chats = [];

  return new Response(JSON.stringify(chats), { status: 200 });
}
