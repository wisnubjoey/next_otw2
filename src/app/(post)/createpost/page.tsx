"use client";

import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";

export default function CreatePost() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadDropzone
        endpoint="imageUploader"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClientUploadComplete={(res: any) => {
          // Do something with the response
          console.log("Files: ", res);
          if (res && res.length > 0) {
            setUploadedImage(res[0].url);
          }
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          console.error(error);
          alert(`ERROR! ${error.message}`);
        }}
      />

      {uploadedImage && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Uploaded Image:</h2>
          <Image
            src={uploadedImage}
            alt="Uploaded image"
            width={300}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>
      )}
    </main>
  );
}