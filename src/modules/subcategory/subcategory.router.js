import { Router } from "express";
import * as Controller from "./subcategory.controller.js";
import fileUpload, { fileType } from "../../utls/multer.js";
import { auth } from "../../middleware/auth.js";
const router = Router({mergeParams: true});
router.post("/",auth(),fileUpload(fileType.image).single("image"),Controller.create);
router.get("/",Controller.getAll);
router.get("/active",Controller.getActive);
router.get("/:id",Controller.getDetails);
router.patch("/:id",auth(),fileUpload(fileType.image).single("image"),Controller.update);
router.delete("/:id",auth(),Controller.deleteCategory);

export default router;