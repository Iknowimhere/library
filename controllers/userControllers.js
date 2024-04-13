import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import sendMail from '../utils/sendMail.js';
export const register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(201).json({
        message: "You're registered already,Please login",
      });
    }
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (
      !existingUser ||
      !(await existingUser.verifyPassword(
        req.body.password,
        existingUser.password
      ))
    ) {
      return res.status(400).json({
        message: 'Name and password do not match',
      });
    }

    let token = await jwt.sign({ id: existingUser._id }, 'Secret', {
      expiresIn: 24 * 60 * 60,
    });
    res.status(200).json({
      status: 'Success',
      data: existingUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (!userExists) {
      return res.status(400).json({
        message: "User doesn't exist",
      });
    }
    const otp = Math.floor(Math.random() * 1000000);

    userExists.otp = otp;
    userExists.otpExpiresAt = Date.now() + 5 * 60 * 1000;
    await userExists.save({ validateBeforeSave: false });

    const subject = `Reset password Link`;
    const resetUrl = `http://localhost:5000/api/v1/reset-password`;
    const text = `This is your reset URL ${resetUrl} and OTP is ${otp} this expires in 5 minutes`;
    await sendMail(userExists.email, subject, text);

    res.status(200).json({
      message: 'Mail sent successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const userExists = await User.findOne({
      otp: req.body.otp,
      otpExpiresAt: { $gte: Date.now() },
    });
    if (!userExists) {
      return res.status(400).json({
        message: 'Otp expired or invalid Otp',
      });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        message: "password and confirm password doesn't match",
      });
    }

    userExists.password = req.body.password;
    userExists.confirmPassword = req.body.confirmPassword;
    userExists.otp = undefined;
    userExists.otpExpiresAt = undefined;
    await userExists.save();
    res.status(200).json({
      message: 'Password reset successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};
