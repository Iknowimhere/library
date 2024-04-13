import express from 'express';
import { db } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import profileRouter from './routes/profileRoute.js';
import authorRouter from './routes/authorRoutes.js';
import bookRouter from './routes/bookRoutes.js';
db();
let app = express();

//to parse json
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/authors', authorRouter);
app.use('/api/v1/books', bookRouter);

export default app;
