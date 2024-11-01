import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { getUserByEmail } from "./db";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}

export async function getApiUser() {
  // Get the current user from next-auth
  const authUser = await getCurrentUser();
  if (!authUser || !authUser.email) {
    return new Response("Unauthorized", { status: 401 });
  }
  // Get the user from the database
  const user = await getUserByEmail(authUser.email);
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  return user;
}
