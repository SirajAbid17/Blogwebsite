import jwt from 'jsonwebtoken'
import env from 'dotenv'
import usermodel from '../models/user.js'

env.config()
const isadmin = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({message: 'Token required'});
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRETYKET);
        const user = await usermodel.findById(decoded.userid);
        
        if (!user) {
            return res.status(401).json({message: 'User not found'});
        }
        
        if (user.role !== 'admin') {
            return res.status(401).json({message: 'User not admin'});
        }

       
        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server error'});
    }
};


const islogin=async(req,res,next)=>{
try {
    
const token= req.cookies.token

if(!token){
    res.send({message:'token not requires'}).status(401)
}
const decoded=jwt.verify(token,process.env.JWT_SECRETYKET)
const user=await usermodel.findById(decoded.userid)
if(!user){
res.send({message:'Users not found'}).status(401)
}



else{
    req.user=user
    next()
}

} catch (error) {
    console.log(error)
}
}


export {isadmin,islogin}