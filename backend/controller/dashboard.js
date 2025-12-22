import postmodel from "../models/blog.js"
import commentsmodel from "../models/comments.js"
import usermodel from "../models/user.js"
import fs from 'fs'
import path from "path"

const getalldata=async(req,res)=>{
try {
    const user=await usermodel.find({})
    const posts=await postmodel.find({})
    const comments=await commentsmodel.find()

    if(!user && !posts){
        return res.status(404).json({success:false,message:'Not Data Found'})
    }
    else{
        return res.status(200).send({success:true,user,posts,comments})
    }
} catch (error) {
    console.log(error)
}
}


const getuser=async(req,res)=>{
try {
    const user=await usermodel.find({})
    if(!user){
        return res.status(404).json({success:false,message:'Not Data Found'})
    }
    else{
        return res.status(200).send({success:true,user})
    }
} catch (error) {
    console.log(error)
}
}


const userdelete = async (req, res) => {
    try {
        const userId = req.params.id;
        const existuser = await usermodel.findById(userId);

        if (!existuser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (existuser.role === 'admin') {
            return res.status(403).json({ success: false, message: 'Admin cannot delete their own account' });
        }

        
        if (existuser.profile && existuser.profile !== 'default.jpg') {
            const profilePath = path.join('public/images', existuser.profile);
            fs.promises.unlink(profilePath)
                .then(() => console.log('Profile image deleted'))
                .catch((err) => console.log('Error deleting image:', err.message));
        }

        const deletedUser = await usermodel.findByIdAndDelete(userId);

        return res.status(200).json({ success: true, message: 'User account deleted successfully', user: deletedUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export {getalldata,getuser,userdelete}