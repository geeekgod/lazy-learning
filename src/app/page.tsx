/**
 * Lazy Learning by GeeekGod.
 * @visit: https://geeekgod.in
 */

'use client';

import { Button } from "@/components/ui/button"
import { BrainIcon, GroupIcon, ReplyIcon } from "lucide-react";
import Link from "next/link"
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <BrainIcon className="h-6 w-6" />
          <span className="sr-only">Lazy Learning</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y pb-8">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Lazy Learning: Your Personal Learning Assistant
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  A revolutionary AI-powered platform to help you solve doubts instantly, make learning easy, and
                  achieve academic success.
                </p>
                <Button className="mt-4" onClick={() => {
                  router.push('/app/chat');
                }}>Ask a Question</Button>
              </div>
              <img
                alt="Lazy Learning"
                className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover"
                height="300"
                src="/assets/img/lazy-learning-hero.png"
                width="500"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our Lazy Learning AI is designed with features to provide you with a seamless learning experience.
              </p>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <ReplyIcon className="w-8 h-8" />
                <h3 className="text-lg font-bold">Instant Doubt Solving</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get instant solutions to your doubts at any time of the day.
                </p>
              </div>
              <div className="grid gap-1">
                <BookOpenCheckIcon className="w-8 h-8" />
                <h3 className="text-lg font-bold">Comprehensive Coverage</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Covers a wide range of subjects and topics.</p>
              </div>
              <div className="grid gap-1">
                <GroupIcon className="w-8 h-8" />
                <h3 className="text-lg font-bold">Community Support</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get insights and help from a community of learners.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© Lazy Learning. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function BookOpenCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z" />
      <path d="m16 12 2 2 4-4" />
      <path d="M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2.3" />
    </svg>
  )
}

