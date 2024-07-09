import { Router } from "express";
import * as Controller from "./auth.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import * as schema from "./auth.valedation.js";
import { asyncHandler } from "../../utls/catchError.js";
import { valedation } from "../../middleware/valedation.js";
const router =Router();

router.post('/register',valedation(schema.registerSchema),checkEmail,asyncHandler(Controller.register));
router.get('/confirmEmail/:token',Controller.confirmEmail);
router.post('/login',Controller.login);
router.patch('/sendCode',valedation(schema.sendCodeSchema),Controller.sendCode);
router.patch('/forgotPassword',valedation(schema.forgetPasswordSchema),Controller.forgotPassword);

export default router;