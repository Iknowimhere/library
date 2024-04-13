import { Router } from 'express';
import { auth } from '../middlewares/authMiddleware.js';
import User from '../models/User.js';
let profileRouter = Router();

profileRouter.get('/home', auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.send(`this is home , Welcome ${user.name}`);
});

export default profileRouter;
