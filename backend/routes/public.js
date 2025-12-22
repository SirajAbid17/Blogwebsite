import express from 'express'
import { getsinglepost } from '../controller/public.js'

const publicroutes=express.Router()


publicroutes.get('/singlepost/:id',getsinglepost)

export default publicroutes