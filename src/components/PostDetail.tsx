import Image from 'next/image';
import { formatDate } from '@/lib/date';

interface Post {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  createdAt: string;
  userName: string;
}

export default function PostDetail({ post }: { post: Post }) {
  if (!post) {
    return <div>Loading...</div>;
  }

  const renderMedia = () => {
    if (!post.mediaUrl) {
      return (
        <div className="w-full h-[400px] bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
          <span className="text-gray-500">No media available</span>
        </div>
      );
    }

    if (post.mediaType === 'video') {
      return (
        <video 
          className="w-full rounded-lg mb-4"
          controls
          playsInline
        >
          <source src={post.mediaUrl} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      );
    }

    return (
      <div className="w-full h-[400px] relative rounded-lg mb-4 overflow-hidden">
        <Image 
          src={post.mediaUrl}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {renderMedia()}
      <p className="text-gray-600 mb-4">{post.description}</p>
      <div className="text-sm text-gray-500">
        Posted by {post.userName} on {formatDate(post.createdAt)}
      </div>
    </div>
  );
}