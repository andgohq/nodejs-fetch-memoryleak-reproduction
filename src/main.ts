import { memoryCheck } from "./utils.js";
import { uploadFile } from "./uploader.js";

async function main() {
  const handle = setInterval(() => {
    console.log("PROGRESS");
    memoryCheck();
  }, 5000);

  console.log("START");
  memoryCheck();

  await uploadFile("./5gb.bin", "http://localhost:3001/upload", true);

  if (globalThis.gc) {
    console.log("Garbage collection is executed");
    globalThis.gc();
  }

  console.log("END");
  memoryCheck();

  clearInterval(handle);
}

main();
