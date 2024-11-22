import { Router } from "express";
import * as Controller from "./anime.controller.js";
import fileUpload, { fileType } from "../../utls/multer.js";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./anime.endPoints.js";

const router = Router({ mergeParams: true,caseSensitive: true});



router.post('/', auth(endPoints.create),fileUpload(fileType.image).single("image"),Controller.createAnime);
router.get('/getAll',Controller.getAll);
router.get('/getOngoing',Controller.getOngoing);


export default router;