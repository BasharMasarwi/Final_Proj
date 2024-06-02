import { Router } from 'express'
import * as coponController from './coupon.controller.js';
import { auth } from '../../middleware/auth.js';
import { endpoints } from './coupon.endPoint.js';

const router = Router();

router.post('/', auth(endpoints.create),coponController.createCopon);

export default router;