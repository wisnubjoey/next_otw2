"use client";

import { formatDate } from "@/lib/date";
import Link from "next/link";
import { useState } from "react";

interface Post {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  createdAt: string;
  userName: string;
}

interface PostListProps {
  posts: Post[];
}

const ProfilePostCard: React.FC<PostListProps> = ({ posts }) => {
  const renderMedia = (post: Post) => {
    if (post.mediaType === 'video') {
      return (
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={post.mediaUrl} type="video/mp4" />
        </video>
      );
    }

    return (
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${post.mediaUrl})` }}
      />
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
      {posts.map((post) => (
        <div className="group/card hover:scale-105 duration-300 w-full min-w-[384px] md:min-w-0 md:max-w-[500px]" key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <div className="cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-between p-4">
              {post.mediaUrl && renderMedia(post)}
              <div className="absolute w-full h-full top-0 left-0 transition duration-300 bg-black opacity-30 group-hover/card:opacity-0"></div>
              <div className="flex flex-row items-center space-x-4 z-10">
                <div className="flex flex-col">
                  <p className="font-normal text-base text-gray-50 relative z-10 hover:underline hover:decoration-solid hover:underline-offset-4">
                    {post.userName}
                  </p>
                  <p className="text-sm text-gray-400">{formatDate(post.createdAt)}</p>
                </div>
              </div>
              <div className="text content">
                <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
                  {post.title}
                </h1>
                <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
                  {post.description}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProfilePostCard;