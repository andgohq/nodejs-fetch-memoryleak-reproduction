import { memoryCheck } from "./utils.js";
import { uploadFile } from "./uploader.js";

async function main() {
  const handle = setInterval(() => {
    console.log("PROGRESS");
    memoryCheck();
  }, 5000);

  console.log("START");
  memoryCheck();

  await uploadFile("./1gb.bin", "http://localhost:3001/upload");

  console.log("END");
  memoryCheck();

  clearInterval(handle);
}

main();
