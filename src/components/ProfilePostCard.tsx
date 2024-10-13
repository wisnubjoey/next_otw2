import { Card, CardContent } from "./ui/card"
import { formatDate } from "@/lib/date"

interface Post {
    id: string
    title: string
    description: string
    createdAt: string
    updatedAt: string
    userName: string
}

interface PostListProps {
    posts: Post[]
}

const ProfilePostCard: React.FC<PostListProps> = ({ posts }) => {
    return (
        <div className="space-y-4">
{posts.map((post) => (
<Card className="w-full rounded-lg overflow-hidden" key={post.id}>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-2">{post.description}</p>
            <p className="text-sm text-gray-500">Posted on: <span className="text-blue-500 font-semibold">{formatDate(post.createdAt)} by {post.userName}</span></p>
          </CardContent>
        </Card>
          ))}
          


        </div>
    )
}

export default ProfilePostCard
