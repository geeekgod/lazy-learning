// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/XQmlH6KQWTk
//  */
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { BrainIcon } from "lucide-react"

export default function Component() {
  return (
    <div className="w-full h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full py-4 px-6 bg-white shadow-md flex items-center justify-between">
        {/* <h1 className="font-bold text-2xl">Lazy Learning</h1> */}
        <Link className="flex items-center justify-center" href="/">
          <BrainIcon className="h-6 w-6" />
          <span className="sr-only">Lazy Learning</span>
        </Link>
        <Button variant="outline">Logout</Button>
      </header>
      <div className="flex flex-grow overflow-auto p-6">
        <main className="flex flex-col gap-6 w-full max-w-xl m-auto">
          <Card className="p-4 space-y-4">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage alt="User" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="font-medium">User</div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Hi, I'm wondering if you can help me understand the concept of Machine Learning?
              </p>
            </CardContent>
          </Card>
          <Card className="p-4 space-y-4 bg-gray-50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage alt="AI" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="font-medium">AI Assistant</div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Sure, Machine learning is a type of artificial intelligence (AI) that allows software applications to become
                more accurate in predicting outcomes without being explicitly programmed to do so. Machine learning
                algorithms use historical data as input to predict new output values.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
      <div className="w-full p-6 bg-white shadow-md">
        <div className="flex gap-4">
          <Input className="flex-grow" placeholder="Type your message here..." />
          <Button variant="filled">Send</Button>
        </div>
      </div>
    </div>
  )
}

