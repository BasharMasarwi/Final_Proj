import { Router } from "express";
import * as Controller from "./auth.controller.js";
const router =Router();

router.post("/register",Controller.register);
router.post("/login",Controller.login);
router.patch("/sendCode",Controller.sendCode);
router.patch("/forgotPassword",Controller.forgotPassword);
export default router;