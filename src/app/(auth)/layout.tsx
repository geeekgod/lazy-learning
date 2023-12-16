import { Toaster } from "@/components/ui/toaster"
interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <main className="min-h-screen">{children}</main>
      <Toaster />
    </>
  )
}
