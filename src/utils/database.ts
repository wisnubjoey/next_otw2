import { db, posts, users } from '@/lib/database';
import { eq } from 'drizzle-orm';

export async function getPostById(id: string) {
  const result = await db
    .select({
      id: posts.id,
      title: posts.title,
      description: posts.description,
      imageUrl: posts.imageUrl,
      createdAt: posts.createdAt,
      userName: users.name,
    })
    .from(posts)
    .leftJoin(users, eq(posts.userId, users.id))
    .where(eq(posts.id, id))
    .limit(1);

  return result[0] || null;
}