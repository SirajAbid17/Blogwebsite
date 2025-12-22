import express from 'express'
import { login, logout, Register } from '../controller/authcontroler.js'
import upload from '../middleware/multer.js'
import usermodel from '../models/user.js'
import bcrypt from 'bcrypt'
import { islogin } from '../middleware/isadmin.js'
import formatRequestBody from '../middleware/formatBody.js'

const route = express.Router()

route.post('/register', upload.single('profile'), Register)
route.post('/login', login)
route.post('/logout', logout)
route.use(formatRequestBody);

route.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    // Validate ID
    if (!id || id === 'undefined' || id === 'null') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid user ID' 
      })
    }

    const user = await usermodel.findById(id).select('-password')
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      })
    }
    
    res.status(200).json({ 
      success: true, 
      user 
    })
  } catch (error) {
    console.error('Get user error:', error)
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid user ID format' 
      })
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    })
  }
})


route.put('/update/:id', islogin, upload.single('profile'), async (req, res) => {
  try {
    const { id } = req.params
    const { Fullname, email, bio } = req.body
    
   
    const user = await usermodel.findById(id)
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      })
    }
    
    if (req.user._id.toString() !== id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Unauthorized to update this profile' 
      })
    }
    
    
    if (Fullname) user.Fullname = Fullname
    if (email) user.email = email
    if (bio !== undefined) user.bio = bio
    
   
    if (req.file) {
      user.profile = req.file.filename
    }
    
    await user.save()
 
    const updatedUser = await usermodel.findById(id).select('-password')
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    })
    
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    })
  }
})



export default route