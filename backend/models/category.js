import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    image: {
        type: String,
        default: ""
    },
    postCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const categoryModel = mongoose.model('categories', categorySchema);

export default categoryModel;