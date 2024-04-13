import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({
      message: 'Please login',
    });
  }
  const decodedToken = await jwt.verify(token, 'Secret');
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(403).json({
      message: 'This user no longer exists',
    });
  }
  req.userId = user._id;
  next();
};
