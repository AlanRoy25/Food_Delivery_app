import path from 'path';
import fs from 'fs';
import cors from 'cors';
import express from 'express';
import { connectdb } from './config/db.js';
import foodRouter from './Routing/foodRoutes.js'; // Ensure 'Routing' is correctly cased
import 'dotenv/config';
import userRoutes from './Routing/userRoutes.js';   // Ensure 'Routing' is correctly cased

// Debugging statements
console.log('Checking paths and files...');
console.log('Current working directory:', process.cwd());
console.log('Checking file existence at:', path.resolve('Routing/userRoutes.js'));
console.log('File exists:', fs.existsSync(path.resolve('Routing/userRoutes.js')));

// App configuration
const app = express();

// Middlewares
app.use(express.json());

// Configure CORS


app.use(cors({
 allowedOrigins: ['https://fooddeliveryapp-alanroy25s-projects.vercel.app',
  'http://localhost:4000',
  'http://localhost:5173',
  'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Handle preflight requests for all routes
app.options('*', cors()); // CORS preflight handling for all routes

// Database connection
connectdb();
console.log(connectdb);

// API endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API working');
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
