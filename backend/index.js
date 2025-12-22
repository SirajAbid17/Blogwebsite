import express from 'express';
import dotenv from 'dotenv';
import dbconnect from './config/db.js';
import route from './routes/Authroutes.js';
import cookieParser from 'cookie-parser';
import routeblog from './routes/blogroutes.js';
import dashboardroutes from './routes/dashboard.js';
import commentroute from './routes/comments.js';
import publicroutes from './routes/public.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOption = {
  origin: 'http://localhost:5173',  
  credentials: true               
};

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
dotenv.config();


app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(express.static('public'));

dbconnect();

const PORT = process.env.PORT || 4000;


app.use('/auth', route);
app.use('/blog', routeblog);
app.use('/dashboard', dashboardroutes);
app.use('/comments', commentroute);
app.use('/public', publicroutes);
app.use('/categories', categoryRoutes);

app.get('/', (req, res) => {
    res.json({ 
        message: 'Blog API is running...',
        imagePath: '/images'
    });
});


app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Images served from: ${path.join(__dirname, 'public/images')}`);
});