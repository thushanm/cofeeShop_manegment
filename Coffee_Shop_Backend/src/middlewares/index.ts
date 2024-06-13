import multer from "multer";
import path from "path";
import process from "process";
import express from "express";
import jwt, {Secret} from "jsonwebtoken";


const storage = multer.diskStorage({
    destination: (req , file, cb) => {
        cb(null, "src/assets/images")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});


const upload = multer({
    storage: storage
});

export const handleImage = upload.single('file');

export const verifyToken = (req: express.Request, res: any, next: express.NextFunction) => {

    /*const token = req.headers.authorization;
    // verify the token

    if (!token) {

        return res.status(401).json("Invalid token");
    }
    try {
        const data = jwt.verify(token, process.env.SECRET as Secret);
        res.tokenData = data;
        next();
    } catch (error) {
        return res.status(401).json("Invalid token");
    }*/
    next();
}
