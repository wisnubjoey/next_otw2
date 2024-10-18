import { Card, CardContent } from "./ui/card";
import { formatDate } from "@/lib/date";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

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
  
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <CardContainer className="inter-var" key={post.id}>
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-2">{post.description}</p>
              <p className="text-sm text-gray-500">
                Posted on:{" "}
                <span className="text-blue-500 font-semibold">
                  {formatDate(post.createdAt)} by {post.userName}
                </span>
              </p>
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src={post.imageUrl}
                alt={post.title}
                height={1000}
                width={1000}
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                
              />
            </CardItem>


            
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-2">{post.description}</p>
            <p className="text-sm text-gray-500">
              Posted on:{" "}
              <span className="text-blue-500 font-semibold">
                {formatDate(post.createdAt)} by {post.userName}
              </span>
            </p>
          </CardBody>
        </CardContainer>
      ))}

    </div>
  );
};

export default ProfilePostCard;
