import mongoose from "mongoose";

const commentschema=new mongoose.Schema({
    postid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts',
        required:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    comments:{
        type:String,
        required:true
    }
},{timestamps:true})

const commentsmodel=mongoose.model('comments',commentschema)

export default commentsmodel