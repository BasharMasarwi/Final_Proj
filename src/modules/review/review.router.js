import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./review.role.js";
import * as Controller from "./review.controller.js";
import fileUpload , { fileType } from "../../utls/multer.js";
import { asyncHandler } from "../../utls/catchError.js";
import * as schema from "./review.valedation.js";
import { valedation } from '../../middleware/valedation.js';

const router = Router({mergeParams:true});

router.post('/',auth(endPoints.create),fileUpload(fileType.image).single('image'),valedation(schema.createReviews),asyncHandler(Controller.create));

export default router;  