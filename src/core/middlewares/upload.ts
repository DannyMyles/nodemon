import multer from 'multer';
import { Request } from 'express';
import path from 'path';

export default function (): multer.Multer {
  let uploader = multer({ dest: `./public/uploads/` });
  const storage = multer.diskStorage({
    destination: function (req: Request, file, cb) {
      cb(null, path.join(__dirname + `/../../../public/uploads`));
    },
    filename: async function (req: Request, file, cb) {
      cb(null, file.originalname);
    },
  });
  uploader = multer({
    storage: storage,
    limits: { fileSize: 200000 },
  });
  return uploader;
}
