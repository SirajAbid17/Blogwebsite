import categoryModel from "../models/category.js";
import postModel from "../models/blog.js";


const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({ isActive: true })
            .sort({ createdAt: -1 });

        const allPosts = await postModel.find({});
        
        const categoriesWithCounts = categories.map(category => {
            const postCount = allPosts.filter(post => 
                post.category && post.category.toLowerCase() === category.name.toLowerCase()
            ).length;
            
            return {
                ...category.toObject(),
                postCount
            };
        });

        return res.status(200).json({
            success: true,
            categories: categoriesWithCounts
        });

    } catch (error) {
        console.error('Get categories error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
};


const getCategoriesWithStats = async (req, res) => {
    try {
        const allPosts = await postModel.find({});
        const categories = await categoryModel.find({ isActive: true })
            .sort({ name: 1 });

        const categoriesWithStats = categories.map(category => {
            const categoryPosts = allPosts.filter(post => 
                post.category && post.category.toLowerCase() === category.name.toLowerCase()
            );
            
            return {
                ...category.toObject(),
                postCount: categoryPosts.length,
                recentPosts: categoryPosts.slice(0, 3)
            };
        });

        const uncategorizedPosts = allPosts.filter(post => !post.category || post.category === "Uncategorized");
        if (uncategorizedPosts.length > 0) {
            categoriesWithStats.push({
                _id: "uncategorized",
                name: "Uncategorized",
                description: "Posts without specific category",
                postCount: uncategorizedPosts.length,
                recentPosts: uncategorizedPosts.slice(0, 3),
                isActive: true,
                createdAt: new Date()
            });
        }

        return res.status(200).json({
            success: true,
            categories: categoriesWithStats
        });

    } catch (error) {
        console.error('Get categories with stats error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
};


const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        if (!name) {
            return res.status(400).json({ 
                success: false, 
                message: 'Category name is required' 
            });
        }

      
        const existingCategory = await categoryModel.findOne({ 
            name: { $regex: new RegExp('^' + name + '$', 'i') } 
        });

        if (existingCategory) {
            return res.status(400).json({ 
                success: false, 
                message: 'Category already exists' 
            });
        }

        
        const slug = name.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
        
        const image = req.file?.filename || '';

        const newCategory = new categoryModel({
            name,
            description,
            slug,
            image
        });

        await newCategory.save();

        return res.status(201).json({
            success: true,
            message: 'Category created successfully',
            category: newCategory
        });

    } catch (error) {
        console.error('Create category error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
};


const getPostsByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params;
        
        const posts = await postModel.find({ 
            $or: [
                { category: categoryName },
                { category: { $regex: new RegExp('^' + categoryName + '$', 'i') } }
            ]
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            posts,
            category: categoryName
        });

    } catch (error) {
        console.error('Get posts by category error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
};


const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, isActive } = req.body;
        
        const category = await categoryModel.findById(id);
        
        if (!category) {
            return res.status(404).json({ 
                success: false, 
                message: 'Category not found' 
            });
        }

        if (name && name !== category.name) {
            const existingCategory = await categoryModel.findOne({ 
                name: { $regex: new RegExp('^' + name + '$', 'i') },
                _id: { $ne: id }
            });

            if (existingCategory) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Category name already exists' 
                });
            }
            
            category.slug = name.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
            category.name = name;
        }

        if (description !== undefined) category.description = description;
        if (isActive !== undefined) category.isActive = isActive;
        if (req.file) category.image = req.file.filename;

        await category.save();

        return res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            category
        });

    } catch (error) {
        console.error('Update category error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
};


const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        
        const category = await categoryModel.findById(id);
        
        if (!category) {
            return res.status(404).json({ 
                success: false, 
                message: 'Category not found' 
            });
        }

        await categoryModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });

    } catch (error) {
        console.error('Delete category error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
};

export { 
    getAllCategories, 
    getCategoriesWithStats, 
    createCategory,
    getPostsByCategory,
    updateCategory,
    deleteCategory
};