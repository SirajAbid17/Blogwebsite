import mongoose from 'mongoose';
import categoryModel from './models/category.js';
import dotenv from 'dotenv';

dotenv.config();

const categories = [
    { name: 'Technology', description: 'Latest tech trends and innovations' },
    { name: 'Programming', description: 'Coding tutorials and programming tips' },
    { name: 'Web Development', description: 'Frontend and backend development' },
    { name: 'Mobile Development', description: 'iOS and Android app development' },
    { name: 'Design', description: 'UI/UX design principles and practices' },
    { name: 'Databases', description: 'Database management and optimization' },
    { name: 'DevOps', description: 'Deployment and infrastructure' },
    { name: 'AI & ML', description: 'Artificial Intelligence and Machine Learning' }
];

const seedCategories = async () => {
    try {
        await mongoose.connect(process.env.URL);
        
        // Clear existing categories
        await categoryModel.deleteMany({});
        
        // Insert new categories
        for (const cat of categories) {
            const slug = cat.name.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
            await categoryModel.create({
                ...cat,
                slug
            });
        }
        
        console.log('Categories seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding categories:', error);
        process.exit(1);
    }
};

seedCategories();