import { Router } from 'express'
import * as cartController from './cart.controller.js';
import { auth } from '../../middleware/auth.js';
import { endpoints } from './cart.endPoint.js';

const router = Router();

router.post('/', auth(endpoints.create),cartController.createCart);
router.patch('/clearCart', auth(endpoints.clear),cartController.clearCart)
router.patch('/:productId', auth(endpoints.delete),cartController.removeItem);
router.patch('/updateQuantity/:productId', auth(endpoints.update),cartController.updateQuantity)
export default router;