import { Router } from 'express';
import { auth } from '../middlewares/authMiddleware.js';
import { getBooks, postBook } from '../controllers/bookControllers.js';

const bookRouter = Router();

bookRouter.get('/', auth, getBooks);
bookRouter.post('/', auth, postBook);
// bookRouter.get('/:id', auth, getBook);
// bookRouter.put('/:id', auth, updateBook);
// bookRouter.delete('/:id', auth, deleteBook);

export default bookRouter;
