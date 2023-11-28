import multer from "multer";
import { fileFilter } from "./file-filter";
import { Request } from "express";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
        callback(null, `${Date.now()}-book-${file.originalname}`);
    }
});

export const uploads = multer({ storage: storage, fileFilter: fileFilter });