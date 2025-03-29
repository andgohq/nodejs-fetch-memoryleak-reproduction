import { createReadStream } from "node:fs";
import path from "node:path";
export async function uploadFile(filePath: string, uploadUrl: string, consumeResponse: boolean) {
  const { name } = path.parse(filePath);

  const formData = new FormData();

  formData.set("file", {
    name,
    [Symbol.toStringTag]: "File",
    stream: () => createReadStream(filePath),
  } as unknown as Blob);

  try {
    const response = await fetch(uploadUrl, {
      method: "PUT",
      body: formData,
      headers: {
        // Content-Type must not be set because boundary error will occur. It is handled automatically.
      },
    });

    console.log("Status:", response.status);

    if (consumeResponse && response.body) {
      const reader = response.body.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          console.log("Chunk:", value);
        }
      } finally {
        reader.releaseLock();
      }
    }
  } catch (err) {
    console.error("Upload failed:", err);
  }
}
