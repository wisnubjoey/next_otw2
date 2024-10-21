"use client";

import { formatDate } from "@/lib/date";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  imageUrl: string;
}

interface PostListProps {
  posts: Post[];
}

const ProfilePostCard: React.FC<PostListProps> = ({ posts }) => {
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  console.log("Received posts:", posts);
  console.log("Image error status:", imageError);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div className="w-80 group/card hover:scale-105 duration-300" key={post.id}>
          <div
            className={cn(
              "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
              "bg-cover",
              post.imageUrl ? "" : "bg-black"
            )}
            style={post.imageUrl ? { backgroundImage: `url(${post.imageUrl})` } : {}}
          >
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
        </div>
      ))}
    </div>
  );
};

export default ProfilePostCard;
