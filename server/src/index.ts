import express, { Request, Response } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import routes from './routes';


config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // Enable CORS for cross-origin requests (important for dev)
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Optional: for form data if needed

app.use(routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});