import { Router } from 'express'
import * as orderController from './order.controller.js';
import { auth } from '../../middleware/auth.js';
import { endpoints } from './order.endPoint.js';

const router = Router();

router.post('/', auth(endpoints.create),orderController.createOrder);

router.get('/all', auth(endpoints.all),orderController.getOrders);
router.get('/userOrders', auth(endpoints.get),orderController.getUserOrders);
router.patch('/changeStatus/:orderId', auth(endpoints.changeStatus),orderController.changeStatus);

export default router;