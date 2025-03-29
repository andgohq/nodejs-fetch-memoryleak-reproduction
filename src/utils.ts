export function memoryCheck() {
  const heap = process.memoryUsage();
  const msg = [];
  for (const key in heap) {
    msg.push(`${key}: ${Math.round(heap[key as keyof typeof heap] / 1024 / 1024)} MB`);
  }
  console.log(msg.join(", "));
}
