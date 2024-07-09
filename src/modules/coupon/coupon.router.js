import { Router } from 'express'
import * as coponController from './coupon.controller.js';
import { auth } from '../../middleware/auth.js';
import { endpoints } from './coupon.endPoint.js';
import * as schema from "./coupon.valedation.js";
import { valedation } from '../../middleware/valedation.js';
const router = Router();

router.post('/', auth(endpoints.create),valedation(schema.createCouponSchema) ,coponController.createCopon);

export default router;