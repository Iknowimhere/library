import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'name field is required'],
    },
    email: {
      type: String,
      required: [true, 'email field is required'],
    },
    password: {
      type: String,
      required: [true, 'Password field is required'],
      minLength: [8, 'Password should have min 8 characters'],
    },
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: 'Password and Confirm Password do not match',
      },
    },
    otp: String,
    otpExpiresAt:Date
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.verifyPassword = async function (pwd, pwdDb) {
  return await bcrypt.compare(pwd, pwdDb);
};
const User = model('User', userSchema);

export default User;
