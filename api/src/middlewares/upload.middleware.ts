import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadPath = path.resolve('uploads/tickets');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

export const uploadTicketFile = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
