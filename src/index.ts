import app from './app';

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`Server running. Use our API on port: ${PORT}`);
});
