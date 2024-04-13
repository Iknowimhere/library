import { Schema, model } from 'mongoose';

const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
    },
    source: {
      type: String,
    },
    publishedAt: {
      type: Date,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Book = model("Book", bookSchema)

export default Book;
