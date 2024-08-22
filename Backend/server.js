import path from 'path';
import fs from 'fs';

console.log('Checking paths and files...');
console.log('Current working directory:', process.cwd());
console.log('Checking file existence at:', path.resolve('routes/userRoutes.js'));
console.log('File exists:', fs.existsSync(path.resolve('routes/userRoutes.js')));

import express from 'express';
import { connectdb } from './config/db.js';
import foodRouter from './Routes/foodRoutes.js';
import userRouter from './routes/userRoutes.js';
import 'dotenv/config';

// app config
const app = express();

//middlewares
app.use(express.json());

// db connection
connectdb();

// api endpoint
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('Api working');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server Started on ${PORT}`));
