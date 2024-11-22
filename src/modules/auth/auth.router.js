import { Router } from "express";
import * as Controller from "./auth.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import * as schema from "./auth.validation.js";
import { asyncHandler } from "../../utls/catchError.js";
import { validation } from "../../middleware/validation.js";
const router =Router();

router.post('/register',validation(schema.registerSchema),checkEmail,asyncHandler(Controller.register));
router.get('/confirmEmail/:token',Controller.confirmEmail);
router.post('/login',validation(schema.loginSchema),asyncHandler(Controller.login));
router.patch('/sendCode',validation(schema.sendCodeSchema),Controller.sendCode);
router.patch('/forgotPassword',validation(schema.forgetPasswordSchema),Controller.forgotPassword);

export default router;