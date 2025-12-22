import express from 'express';
import { 
    getAllCategories, 
    getCategoriesWithStats, 
    createCategory,
    getPostsByCategory
} from '../controller/categoryController.js';
import { isadmin } from '../middleware/isadmin.js';
import upload from '../middleware/multer.js';

const categoryRoutes = express.Router();

categoryRoutes.get('/', getAllCategories);
categoryRoutes.get('/stats', getCategoriesWithStats);
categoryRoutes.get('/posts/:categoryName', getPostsByCategory);


categoryRoutes.post('/create', isadmin, upload.single('image'), createCategory);

export default categoryRoutes;