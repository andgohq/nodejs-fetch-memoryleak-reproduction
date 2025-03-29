import { createReadStream } from "node:fs";
import path from "node:path";
export async function uploadFile(filePath: string, uploadUrl: string) {
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
    // const text = await response.text();
    // console.log("Response:", text);
  } catch (err) {
    console.error("Upload failed:", err);
  }
}
