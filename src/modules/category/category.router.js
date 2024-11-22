import { Router } from "express";
import * as Controller from "./category.controller.js";
import fileUpload, { fileType } from "../../utls/multer.js";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./category.role.js";
const router = Router({caseSensitive: true});


router.post("/",auth(endPoints.create),fileUpload(fileType.image).single("image"),Controller.create);
router.get("/",auth(endPoints.getAll),Controller.getAll);
router.get("/active",Controller.getActive);
router.get("/:id",Controller.getDetails);
router.patch("/:id",auth(),fileUpload(fileType.image).single("image"),Controller.update);
router.delete("/:id",auth(),Controller.deleteCategory);

export default router;