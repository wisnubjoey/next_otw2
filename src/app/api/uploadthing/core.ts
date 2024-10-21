import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/database";
import { posts } from "@/lib/schema";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 6} })
    .middleware(async ({ req }) => {
      const session = await auth();
      if (!session || !session.user) {
        console.log("Unauthorized: No session or user");
        throw new UploadThingError("Unauthorized");
      }
      console.log("Authorized user:", session.user.id);
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      // ... rest of your onUploadComplete logic
    }),
} satisfies FileRouter;