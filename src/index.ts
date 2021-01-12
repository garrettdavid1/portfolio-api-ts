import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import './database';
import bodyParser from 'body-parser';
import { handleConnectRequest } from './controllers/connectRequestController';
import path from 'path';
import { startDB } from './database';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

startDB();

const app = express();
app.use(express.static(path.join(__dirname, '/emailTemplates')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: () => void) => {
	res.header(
		'Access-Control-Allow-Origin',
		process.env.ALLOWED_ORIGINS
	);
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

// define a route handler for the default home page
app.get('/', (req: Request, res: Response) => {
	res.send('Hello world!');
});
app.post('/connect', wrapAsync(handleConnectRequest));

app.use((error: any, req: Request, res: Response, next: () => void) => {
	res.json({ message: error.message });
});

const port = process.env.port || 8080;
app.listen(port, () => {
	console.log(`\nServer started at http://localhost:${port}`);
});

function wrapAsync(
	fn: (req: Request, res: Response, next: () => void) => Promise<any>
) {
	return (req: Request, res: Response, next: () => void) => {
		// Make sure to `.catch()` any errors and pass them along to the `next()`
		// middleware in the chain, in this case the error handler.
		fn(req, res, next).catch(next);
	};
}
