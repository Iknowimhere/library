import Book from '../models/Book.js';
import Author from '../models/Author.js';

export const postBook = async (req, res) => {
  try {
    const { name, source, rating, publishedAt, authorName } = req.body;
    if (!name || !source || !rating || !publishedAt || !authorName) {
      return res.status(400).json({
        message: 'Please enter all fields',
      });
    }
    const author = await Author.findOne({ name: authorName });
    const newBook = await Book.create({ name, source, rating, publishedAt });

    //save author to book
    newBook.author = author._id;
    await newBook.save();

    //save book to author
    author.booksByAuthor.push(newBook._id);
    await author.save();

    res.status(201).json({
      status: 'Success',
      message: 'Book created successfully',
      data: newBook,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: error.message,
    });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author');
    if (!books) {
      return res.status(400).json({
        message: 'There are no books to display',
      });
    }

    res.status(200).json({
      status: 'Success',
      message: 'Books fetched successfully',
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: error.message,
    });
  }
};
