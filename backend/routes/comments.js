import express from 'express'
import { addcomments, deleteComment } from '../controller/comments.js'
import { islogin, isadmin } from '../middleware/isadmin.js'
const commentroute=express.Router()

commentroute.post('/addcomments',islogin,addcomments)
commentroute.delete('/delete/:id', isadmin, deleteComment) 

export default commentroute