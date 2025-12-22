import postModel from "../models/blog.js";
import fs from 'fs';
import path from "path";

const Create = async (req, res) => {
    try {
        console.log('=== CREATE POST REQUEST ===');
        console.log('Request Body:', req.body);
        console.log('Request File:', req.file);
        console.log('User from request:', req.user); 
        const { title, description, category } = req.body;

        if (!title || !description) {
            return res.status(400).json({ 
                success: false,
                message: 'Title and description are required' 
            });
        }

    
        if (!req.file) {
            console.log('ERROR: No file uploaded');
            return res.status(400).json({
                success: false,
                message: 'Image is required'
            });
        }

        const image = req.file.filename;

      
        const postData = {
            title,
            description,
            image,
            category: category || "Uncategorized",
            author: req.user._id 
        };

        console.log('Creating post with data:', postData);

        const createblog = new postModel(postData);
        await createblog.save();
        
        console.log('Post created successfully:', createblog._id);
        
        return res.status(201).json({
            success: true,
            message: 'Post created successfully',
            post: createblog
        });

    } catch (error) {
        console.error('CREATE POST ERROR:', error);
        console.error('Error Stack:', error.stack);
        return res.status(500).json({
            success: false,
            message: 'Server error: ' + error.message
        });
    }
};

const deletepost = async (req, res) => {
    try {
        const deleteid = req.params.id;

        const findpost = await postModel.findById(deleteid);
        if (!findpost) {
            return res.status(404).json({ 
                success: false,
                message: 'Post not found' 
            });
        }

       
        if (findpost.image) {
            const imagePath = path.join('public/images', findpost.image);
            if (fs.existsSync(imagePath)) {
                await fs.promises.unlink(imagePath)
                    .then(() => console.log('Post image deleted:', findpost.image))
                    .catch((err) => console.log('Error deleting image:', err.message));
            }
        }

        const deletedPost = await postModel.findByIdAndDelete(deleteid);

        return res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
            post: deletedPost
        });

    } catch (error) {
        console.error('Delete Post Error:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Internal server error' 
        });
    }
};

const getposts = async (req, res) => {
    try {
        const posts = await postModel.find({})
            .populate({
                path: 'author',
                select: 'Fullname profile email'
            })
            .sort({ createdAt: -1 });

     
        const categories = [...new Set(posts.map(post => post.category).filter(Boolean))];
        
      
        const formattedPosts = posts.map(post => ({
            _id: post._id,
            title: post.title,
            description: post.description,
            image: post.image,
            category: post.category || "Uncategorized",
            content: post.content,
            author: post.author,
            views: post.views || 0,
            readingTime: post.readingTime || 3,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
        }));
        
        return res.status(200).json({
            success: true,
            message: 'Posts fetched successfully',
            posts: formattedPosts,
            categories: categories.map(cat => ({
                name: cat,
                count: posts.filter(p => p.category === cat).length
            }))
        });

    } catch (error) {
        console.error('Get Posts Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

const updatepost = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const postid = req.params.id;

        const findpost = await postModel.findById(postid);

        if (!findpost) {
            return res.status(404).json({
                success: false,
                message: 'No post found with this ID'
            });
        }

        
        if (req.file && findpost.image) {
            const oldImagePath = path.join('public/images', findpost.image);
            if (fs.existsSync(oldImagePath)) {
                await fs.promises.unlink(oldImagePath)
                    .then(() => console.log('Old image deleted:', findpost.image))
                    .catch((err) => console.log('Error deleting old image:', err));
            }
            findpost.image = req.file.filename;
        }

        if (title) findpost.title = title;
        if (description) findpost.description = description;
        if (category) findpost.category = category;

        const updatedPost = await findpost.save();

        return res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            post: updatedPost
        });

    } catch (error) {
        console.error('Update Post Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

export { Create, deletepost, getposts, updatepost };