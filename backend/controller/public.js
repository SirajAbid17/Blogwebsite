import postmodel from "../models/blog.js"

const getsinglepost=async(req,res)=>{
try {
    
const postid=req.params.id
const findpost=await postmodel.findById(postid)
.populate({
    path:'comments',
    populate:{
        path:'userid'
    }
})
if(!findpost){
    return res.status(404).send({message:'blog not found'})
}
else{
    res.status(200).json({message:true,post:findpost})
}
} catch (error) {
    console.log(error)
}
}

export {getsinglepost}