import { NextResponse } from 'next/server';
import { getPostById } from '@/utils/database';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const post = await getPostById(params.id);
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  return NextResponse.json(post);
}