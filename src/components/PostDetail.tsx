import Image from "next/image";
import { formatDate } from "@/lib/date";

interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  userName: string;
}

export default function PostDetail({ post }: { post: Post }) {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.imageUrl && (
      <Image
        src={post.imageUrl}
        alt={post.title}
        width={800}
        height={400}
        className="rounded-lg mb-4"
        />
      )}
      <p className="text-gray-600 mb-4">{post.description}</p>
      <div className="text-sm text-gray-500">
        Posted by {post.userName} on {formatDate(post.createdAt)}
      </div>
    </div>
  );
}
