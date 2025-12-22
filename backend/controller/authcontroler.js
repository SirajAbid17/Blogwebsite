import usermodel from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from 'dotenv'
env.config()

const Register = async (req, res) => {
    try {
        let fullName = req.body.FullName || req.body.fullName || req.body.Fullname;
        const { email, password } = req.body;
        
        console.log('Registration attempt:', { 
            FullName: req.body.FullName,
            fullName: req.body.fullName,
            Fullname: req.body.Fullname,
            email: req.body.email 
        });
        
        if (!fullName) {
            return res.status(400).json({ 
                success: false, 
                message: 'Full name is required' 
            });
        }

        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }

        const exituser = await usermodel.findOne({ email: email });
        if (exituser) {
            return res.status(400).json({ 
                success: false, 
                message: 'User already exists. Please login.' 
            });
        }

        const profile = req.file?.filename || 'default.jpg';
        const hashpassword = await bcrypt.hashSync(password, 10);

        const newuser = new usermodel({
            Fullname: fullName.trim(), 
            email: email.trim(),
            password: hashpassword,
            profile
        });

        await newuser.save();
        
        return res.status(200).json({
            success: true,
            message: 'User registered successfully',
            user: newuser
        });

    } catch (error) {
        console.log('Registration error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};


const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
         return res.status(400).send({message:'All field are required'})
        }
        const finduser=await usermodel.findOne({email:email})
        if(!finduser){
      return res.status(400).send({message:'No user find Plz register'})
        }
        const comparepassword=await bcrypt.compare(password,finduser.password)
        if(!comparepassword){
              return res.status(400).send({message:'Invalid Password'})
        }
        else{
            const token=jwt.sign({userid:finduser._id},process.env.JWT_SECRETYKET)
            res.cookie('token',token,{
                httpOnly:true,
                secure:false,
                maxAge:3*24*60*60*1000
            })
             return res.status(200).send({message:'Login successfully',user:finduser,token:token})
             
        }
    } catch (error) {
        console.log('server error')
    }
}

const logout=async(req,res)=>{
try {
    res.clearCookie('token')
    return res.status(200).send({message:'Logout successfully'})
} catch (error) {
    console.log(error)
}
}


export {Register,login,logout}