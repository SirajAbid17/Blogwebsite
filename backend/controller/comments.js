import postmodel from "../models/blog.js";
import commentsmodel from "../models/comments.js";

const addcomments = async (req, res) => {
  try {
    const { postid, userid, comments } = req.body;

    const newcomments = new commentsmodel({
      postid,
      userid,
      comments,
    });

    await newcomments.save();

    
    const populatedComment = await commentsmodel.findById(newcomments._id).populate({
      path: 'userid',
      select: 'Fullname profile',
    });

    const findpost = await postmodel.findById(postid);
    if (!findpost) {
      return res.status(404).json({ success: false, message: 'blog post not found' });
    }

    findpost.comments.push(populatedComment._id);
    await findpost.save();

    return res.status(200).send({ success: true, comment: populatedComment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const comment = await commentsmodel.findById(id);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

  
    await postmodel.findByIdAndUpdate(comment.postid, {
      $pull: { comments: id }
    });

    await commentsmodel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export { addcomments, deleteComment };


