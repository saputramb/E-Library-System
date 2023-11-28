import { Request } from "express"
import { FileFilterCallback } from "multer"

export const fileFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    if (
        file.mimetype === 'application/pdf'
    ) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}