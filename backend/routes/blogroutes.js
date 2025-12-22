import express from 'express'
import { Create, deletepost, getposts, updatepost } from '../controller/blogcontroler.js'
import { isadmin } from '../middleware/isadmin.js'
import { uploadSingle } from '../middleware/multer.js'
import postModel from '../models/blog.js' 

const routeblog = express.Router()

routeblog.post('/create', isadmin, uploadSingle('profile'), Create)
routeblog.delete('/delete/:id', deletepost)
routeblog.get('/showall', getposts)
routeblog.patch('/update/:id', isadmin, uploadSingle('profile'), updatepost)

routeblog.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    
    if (!userId || userId === 'undefined' || userId === 'null') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid user ID' 
      })
    }

    const posts = await postModel.find({ 
      author: userId 
    })
    .sort({ createdAt: -1 })
    .populate({
      path: 'author',
      select: 'Fullname profile email'
    })

    res.status(200).json({
      success: true,
      posts
    })

  } catch (error) {
    console.error('Get user posts error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    })
  }
})

export default routeblog