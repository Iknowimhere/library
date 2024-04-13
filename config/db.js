import mongoose from 'mongoose';

export async function db() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/libraryDB');
    console.log('db connected');
  } catch (error) {
    console.log(error);
  }
}
