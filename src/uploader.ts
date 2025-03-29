import { createReadStream } from "node:fs";
import path from "node:path";
// これをコメントアウトするとnodejsのfetchが使われる
import fetch, { FormData } from "node-fetch";
export async function uploadFile(filePath: string, uploadUrl: string, consumeResponse: boolean) {
  const { name } = path.parse(filePath);

  const formData = new FormData();

  const fileStream = createReadStream(filePath);

  fileStream.on("close", () => {
    console.log("fileStream closed");
  });

  formData.set("file", {
    name,
    [Symbol.toStringTag]: "File",
    stream: () => fileStream,
  } as unknown as Blob);

  try {
    const response = await fetch(uploadUrl, {
      method: "PUT",
      body: formData,
      headers: {
        // Content-Type must not be set because boundary error will occur. It is handled automatically.
      },
    });

    fileStream.destroy();

    console.log("Status:", response.status);

    if (consumeResponse) {
      console.log("response.body", await response.text());
    }
    // if (consumeResponse && response.body) {
    //   const reader = response.body.getReader();
    //   try {
    //     while (true) {
    //       const { done, value } = await reader.read();
    //       if (done) {
    //         break;
    //       }
    //       console.log("Chunk:", value);
    //     }
    //   } finally {
    //     reader.releaseLock();
    //   }
    // }
  } catch (err) {
    console.error("Upload failed:", err);
  }
}
