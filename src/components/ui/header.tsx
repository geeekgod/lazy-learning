import { BrainIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import { getCurrentUser } from "@/lib/session";
import { UserAccountNav } from "../user-account-nav";

export const Header = async () => {
  const user = await getCurrentUser()
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        <BrainIcon className="h-6 w-6" />
        <span className="sr-only">Lazy Learning</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        {
          user ? (
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="/app">
              Dashboard
            </Link>
          ) : (
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
              Login
            </Link>
          )
        }
        <ModeToggle />
        {
          user && (
            <UserAccountNav user={user} />
          )
        }
      </nav>
    </header>
  );
}
