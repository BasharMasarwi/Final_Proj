import connectDB from '../DB/connection.js';
import categoriesRouter from './modules/category/category.router.js';
import subcategoriesRouter from './modules/subcategory/subcategory.router.js';
import productRouter from './modules/product/product.router.js';
import cartRouter from './modules/cart/cart.router.js';
import authRouter from './modules/auth/auth.router.js';
import couponRouter from './modules/coupon/coupon.router.js';
import orderRouter from './modules/order/order.router.js';
import reviewRouter from './modules/review/review.router.js';
import userRouter from './modules/user/user.router.js';
const initApp =(app , express) => {
    connectDB();
    app.use(express.json());
    app.get('/', (req, res) => {
        return res.status(200).json({ message: "success" });
    })
    app.use('/categories', categoriesRouter);
    app.use('/subcategories', subcategoriesRouter);
    app.use('/auth', authRouter);
    app.use('/products', productRouter);
    app.use('/cart', cartRouter);
    app.use('/coupon', couponRouter);
    app.use('/order', orderRouter);
    app.use('/review',reviewRouter);
    app.use('/user',userRouter);
    app.use('*', (req, res) => {
        return res.status(404).json({ message: "page not found" });
    })
}

export default initApp;