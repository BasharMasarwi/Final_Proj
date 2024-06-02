import { Router } from "express";
import * as Controller from "./user.controller.js";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./user.role.js";

const router = Router();



router.get('/all', auth(endPoints.getUsers),Controller.getUsers);
router.get('/userData', auth(endPoints.getUserData),Controller.getUserData);



export default router;