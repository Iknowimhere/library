import Author from '../models/Author.js';

export const postAuthor = async (req, res) => {
  try {
    const existingAuthor = await Author.findOne({ name: req.body.name });
    if (existingAuthor) {
      return res.status(400).json({
        message: 'Author with this name exists already',
      });
    }

    const newAuthor = await Author.create({ name: req.body.name });
    res.status(201).json({
      status: 'Success',
      data: newAuthor,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message,
    });
  }
};

export const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find().populate('booksByAuthor');
    if (!authors) {
      return res.status(400).json({
        message: 'No authors',
      });
    }
    res.status(201).json({
      status: 'Success',
      data: authors,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message,
    });
  }
};

export const getAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(400).json({
        message: 'No author found with this Id',
      });
    }
    res.status(201).json({
      status: 'Success',
      data: author,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message,
    });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedAuthor) {
      return res.status(400).json({
        message: 'No author found with this Id',
      });
    }
    res.status(201).json({
      status: 'Success',
      data: updatedAuthor,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message,
    });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    await Author.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: 'Success',
      message: 'Author deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message,
    });
  }
};
