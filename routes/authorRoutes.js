import { Router } from 'express';
import { auth } from '../middlewares/authMiddleware.js';
import {
  deleteAuthor,
  getAuthor,
  getAuthors,
  postAuthor,
  updateAuthor,
} from '../controllers/authorControllers.js';

const authorRouter = Router();

authorRouter.get('/', auth, getAuthors);
authorRouter.post('/', auth, postAuthor);
authorRouter.get('/:id', auth, getAuthor);
authorRouter.put('/:id', auth, updateAuthor);
authorRouter.delete('/:id', auth, deleteAuthor);

export default authorRouter;
