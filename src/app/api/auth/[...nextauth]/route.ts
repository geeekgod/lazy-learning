import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { env } from "@/env.mjs";

// if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
//   throw new Error("Missing GITHUB_ID or GITHUB_SECRET environment variables.");
// }
// if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
//   throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.");
// }

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
  adapter: SupabaseAdapter({
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    secret: env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  session: {
    strategy: "jwt",
  },

}

const handler = NextAuth(authOptions);

export {
  handler as GET,
  handler as POST,
}
