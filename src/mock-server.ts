import express, { Request, Response, type RequestHandler } from "express";
import multer from "multer";
import audit from "express-requests-logger";

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

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
