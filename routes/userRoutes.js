import { Router } from 'express';
import { forgotPassword, login, register, resetPassword } from '../controllers/userControllers.js';

let userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password', resetPassword);

export default userRouter;
