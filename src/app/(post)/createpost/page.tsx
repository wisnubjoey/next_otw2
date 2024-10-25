import Link from 'next/link';
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function CreatePostPage() {
  const session = await auth()
  
  if (!session) {
    redirect('/access')
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Choose Upload Type</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link 
          href="/createpost/image" 
          className="p-6 border rounded-lg hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">Upload Image</h2>
        </Link>

        <Link 
          href="/createpost/video" 
          className="p-6 border rounded-lg hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">Upload Video</h2>
        </Link>
      </div>
    </div>
  );
}