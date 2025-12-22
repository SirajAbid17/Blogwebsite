router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    const posts = await postModel.find({ author: req.params.id }).sort({ createdAt: -1 });
    
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});