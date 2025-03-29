import express, { type Request, type RequestHandler } from "express";
import multer from "multer";
import audit from "express-requests-logger";

// 捨てるだけのカスタムmulterストレージ
const discardStorage = {
  _handleFile(_req: Request, file: Express.Multer.File, cb: (error: Error | null, info?: Express.Multer.File) => void) {
    file.stream.on("data", () => {}); // 何もしないでデータを読む（破棄）
    file.stream.on("end", () => cb(null)); // 処理完了
  },
  _removeFile(_req: Request, _file: Express.Multer.File, cb: (error: Error | null) => void) {
    cb(null);
  },
};

const app = express();
const upload = multer({ storage: discardStorage });

app.use(
  audit({
    logger: console,
  }),
);

const uploadHandler: RequestHandler = (req, res) => {
  if (!req.files || req.files.length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  res.sendStatus(200);
};

app.put("/upload", upload.array("file"), uploadHandler);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
