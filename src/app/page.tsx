import PostList from "@/components/PostCard";


async function getPosts() {
  const res = await fetch('http://localhost:3000/api/posts', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();
  
  return (
    <>
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <PostList posts={posts}/>
    </div>
    </>
  );
}
