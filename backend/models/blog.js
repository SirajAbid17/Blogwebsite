import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: "Uncategorized",
        trim: true
    },
    content: {
        type: String,
        default: ""
    },
    tags: [{
        type: String,
        trim: true
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }],
    views: {
        type: Number,
        default: 0
    },
    readingTime: {
        type: Number,
        default: 3
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: false      
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


blogSchema.virtual('imageUrl').get(function() {
    return `/images/${this.image}`;
});

const postModel = mongoose.model('posts', blogSchema);

export default postModel;