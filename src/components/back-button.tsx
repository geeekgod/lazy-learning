'use client';

import { Button } from "./ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation";

export const BackButton = () => {

  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant='ghost'
    >
      <ChevronLeft className="mr-2 h-4 w-4" />
      Back
    </Button >
  )
}
