import express, { Request, Response, Application, NextFunction } from 'express';
import cors from 'cors';
import booksRouter from 'routes/api/books-router';
import authRouter from 'routes/api/auth-router';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/user', (req: Request, res: Response): void => {
	res.json([{ key: 'value' }]);
});

app.use('/api/users', authRouter);
app.use('/api/books', booksRouter);

app.use((req: Request, res: Response) => {
	res.status(404).json({ message: 'Not found' });
});

app.use((err, req: Request, res: Response, next: NextFunction) => {
	const { status = 500, message = 'Server error' } = err;
	res.status(status).json({ message });
});

export default app;
