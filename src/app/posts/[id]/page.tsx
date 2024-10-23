import PostDetail from '@/components/PostDetail';
import { getPostById } from '@/utils/database';

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);
  if (!post) {
    return <div>Post not found</div>;
  }
  return <PostDetail post={post}/>;
}