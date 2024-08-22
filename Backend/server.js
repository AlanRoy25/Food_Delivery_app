import path from 'path';
import fs from 'fs';
import cors from 'cors';
console.log('Checking paths and files...');
console.log('Current working directory:', process.cwd());
console.log('Checking file existence at:', path.resolve('Routing/userRoutes.js'));
console.log('File exists:', fs.existsSync(path.resolve('Routing/userRoutes.js')));

import express from 'express';
import { connectdb } from './config/db.js';
import foodRouter from './Routing/foodRoutes.js'; // Ensure 'Routes' is correctly cased
import UserRouter from './Routing/userRoutes.js';  // Ensure 'Routes' is correctly cased

import 'dotenv/config';

// app config
const app = express();

//middlewares
app.use(express.json());


app.use(cors({
  origin: 'https://fooddeliveryapp-alanroy25s-projects.vercel.app/', // Vercel URL
  optionsSuccessStatus: 200
}));


// db connection
connectdb();

// api endpoint
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', UserRouter);

app.get('/', (req, res) => {
  res.send('Api working');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server Started on ${PORT}`));
