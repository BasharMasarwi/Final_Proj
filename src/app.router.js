import connectDB from '../DB/connection.js';
import authRouter from './modules/auth/auth.router.js';
import userRouter from './modules/user/user.router.js';
import animeRouter from './modules/anime/anime.router.js';
import categoryRouter from './modules/category/category.router.js';
const initApp =(app , express) => {
    connectDB();
    app.use(express.json());
    app.get('/', (req, res) => {
        return res.status(200).json({ message: "success" });
    })
    app.use('/auth', authRouter);
    app.use('/user',userRouter);
    app.use('/anime',animeRouter);
    app.use('/category',categoryRouter);
    app.use('*', (req, res) => {
        return res.status(404).json({ message: "page not found" });
    })
}

export default initApp;