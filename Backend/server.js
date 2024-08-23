import path from 'path';
import fs from 'fs';
import cors from 'cors';
import express from 'express';
import { connectdb } from './config/db.js';
import foodRouter from './Routing/foodRoutes.js'; // Ensure 'Routing' is correctly cased
import userRouter from './Routing/userRoutes.js';  // Ensure 'Routing' is correctly cased
import 'dotenv/config';

// Debugging statements
console.log('Checking paths and files...');
console.log('Current working directory:', process.cwd());
console.log('Checking file existence at:', path.resolve('Routing/userRoutes.js'));
console.log('File exists:', fs.existsSync(path.resolve('Routing/userRoutes.js')));

// App configuration
const app = express();

// Middlewares
app.use(express.json());

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['https://fooddeliveryapp-alanroy25s-projects.vercel.app'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Database connection
connectdb();

// API endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('API working');
});

// Handle preflight requests for all routes
app.options('*', cors());

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
