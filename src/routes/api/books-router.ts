import express from 'express';
import { authenticate } from 'middlewares';

const booksRouter = express.Router();

booksRouter.use(authenticate);

export default booksRouter;
