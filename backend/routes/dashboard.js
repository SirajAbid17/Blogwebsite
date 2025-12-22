import express from 'express'
import { isadmin } from '../middleware/isadmin.js'
import { getalldata, getuser, userdelete } from '../controller/dashboard.js'
const dashboardroutes=express.Router()

dashboardroutes.get('/',isadmin,getalldata)
dashboardroutes.get('/user',isadmin,getuser)
dashboardroutes.delete('/deleteuser/:id',isadmin,userdelete)

export default dashboardroutes