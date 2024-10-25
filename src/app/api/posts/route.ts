import { db, posts, users } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
    if (req.method === 'GET') {
        try {
            const userId = req.nextUrl.searchParams.get('userId');

            let query = db.select({
                id: posts.id,
                title: posts.title,
                description: posts.description,
                createdAt: posts.createdAt,
                userId: posts.userId,
                userName: users.name,
            }).from(posts).leftJoin(users, eq(posts.userId, users.id));

            if (userId) {
                query = query.where(eq(posts.userId, userId));
            }

            const allPosts = await query.orderBy(posts.createdAt);
            return NextResponse.json(allPosts, { status: 200 })
        } catch (error) {
            console.error("Error fetching posts:", error);
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
        }
    } else {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405, headers: { 'Allow': 'GET' } })
    }
}
