import { NextAuthOptions } from "next-auth"
// Providers
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
// Adapters
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { env } from "@/env.mjs";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],
  adapter: SupabaseAdapter({
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    secret: env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  session: {
    strategy: "jwt",
  },

}
