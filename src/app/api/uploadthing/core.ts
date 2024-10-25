import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/database";
import { posts } from "@/lib/database";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 6} })
    .middleware(async ({ req }) => {
      const session = await auth();
      if (!session || !session.user) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.insert(posts).values({
        userId: metadata.userId,
        mediaUrl: file.url,
        mediaType: 'image',
        title: "New image post",  // default title
        description: ""  // default empty description
      });
      return { url: file.url };
    }),
    
  videoUploader: f({ video: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const session = await auth();
      if (!session || !session.user) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.insert(posts).values({
        userId: metadata.userId,
        mediaUrl: file.url,
        mediaType: 'video',
        title: "New video post",  // default title
        description: ""  // default empty description
      });
      return { url: file.url };
    }),
}