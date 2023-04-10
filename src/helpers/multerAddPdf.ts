import multer from "multer";
import path from "path";

const uuid = require("uuid/v4");

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../companyFiles"),
    filename: (req, file, cb) => cb(null, uuid() + path.extname(file.originalname))
});

export const upload = multer({
    storage
    // limits: {
    //     fileSize: 1000000
    // },
}).single("pdf_file");