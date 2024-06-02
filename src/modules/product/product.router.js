import { Router } from "express";
import fileUpload, { fileType } from "../../utls/multer.js";
import * as controller from "./product.controller.js";
import { auth } from "../../middleware/auth.js";
import {endPoints} from "./product.role.js"

const router = Router();
router.post("/",auth(endPoints.create),fileUpload(fileType.image).fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 5 },
]),controller.create);
router.get('/',controller.getAll);
router.get('/search',controller.search);

export default router;