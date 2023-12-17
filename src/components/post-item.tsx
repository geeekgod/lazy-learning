import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

export const PostItem = ({
  post,
  key
}: {
  post: {
    id: string
    title: string
    content: string
    name: string
    email: string
    image: string
  }
  key: string | number
}) => {
  return (
    <Link href={`/app/community/${post.id}`}>
      <Card key={key}>
        <CardHeader>
          <CardTitle className="mb-0 flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={post.image} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <p className="text-lg">{post.title}</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <span className="font-bold">Question:</span> {post.content}
          </p>
          <p>
            <span className="font-bold mt-3">Asked By:</span> {post.name}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
