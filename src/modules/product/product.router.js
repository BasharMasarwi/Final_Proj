import { Router } from "express";
import fileUpload, { fileType } from "../../utls/multer.js";
import * as controller from "./product.controller.js";
import { auth } from "../../middleware/auth.js";
import {endPoints} from "./product.role.js"
import reviewRouter from "./../review/review.router.js"
import { valedation } from '../../middleware/valedation.js';
import * as schema from "./product.valedation.js";
import { asyncHandler } from "../../utls/catchError.js";
const router = Router();
router.use('/:productId/review', reviewRouter); 

router.post("/",auth(endPoints.create),fileUpload(fileType.image).fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 5 },
]),asyncHandler(valedation(schema.createProductSchema)),asyncHandler(controller.create));


router.get('/',controller.getAll);

export default router;