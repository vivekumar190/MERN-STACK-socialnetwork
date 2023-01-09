const Post = require("../../model/post/Post");
const User = require("../../model/user/User");
const Society = require("../../model/Society/Society");
const asyncHandler = require("express-async-handler");
const validateMOongodbId = require("../../utils/validatemongodbid");
const Filter = require("bad-words");
const { findByIdAndUpdate } = require("../../model/post/Post");

//------------------- CREATE A POST----------------------//
const createPost = asyncHandler(async (req, res) => {
  console.log(req.file);
  const { _id } = req.user;
  // validateMOongodbId(req.body.user);
  //check for bad words
  const filter = new Filter();
  const isProfane = filter.isProfane(req.body.title, req.body.description);
  // Block user
  if (isProfane) {
    const user = await User.findByIdAndUpdate(_id, { isBlocked: true });
    throw new Error(
      "post contains profane Words User Policy violated are blocked Contact administrator"
    );
  }
  const localpath = `/uploads/${req.file.filename}`;

  try {
    const post = await Post.create({
      ...req.body,
      image: localpath,
      user: _id,
      title: req.body.title,
    });
    if (req.body.society) {
      await Society.findByIdAndUpdate(req.body.society, { $inc: { xp: 3 } });
    }
    // increase user points
    await User.findByIdAndUpdate(post.user._id, { $inc: { points: 5 } });
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});
// get all posts from societies and follers of a user

//----------------------get all posts-------------------//
const fetchallPosts = asyncHandler(async (req, res) => {
  const hasCategory = req.query.category;
  const hasSociety = req.query.society;

  try {
    if (hasCategory) {
      const Posts = await Post.find({ category: hasCategory })
        .populate("user")
        .populate("comments")
        .populate("society")
        .sort("-createdAt");
      res.json(Posts);
    }
    if (hasSociety) {
      const Posts = await Post.find({ society: hasSociety })
        .populate("user")
        .populate("comments")
        .populate("society")
        .sort("-createdAt");
      res.json(Posts);
    } else {
      const Posts = await Post.find({})
        .populate("user")
        .populate("comments")
        .populate("society")
        .sort("-createdAt");
      res.json(Posts);
    }
  } catch (error) {
    res.json(error);
  }
});
//---------------------fetch single post-------------------//
const fetchSinglePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMOongodbId(id);

  try {
    const post = await Post.findById(id)
      .populate("user")
      .populate("dislikes")
      .populate("likes")
      .populate("comments");

    //views              same can be made for points
    await Post.findByIdAndUpdate(id, {
      $inc: { numViews: 1 },
    });
    await User.findByIdAndUpdate(post.user._id, { $inc: { points: 10 } });
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});
//--------------------update a post--------------------//

const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMOongodbId(id);
  const thispost = await Post.findById(id);

  if (thispost.user._id.toString() !== req.user._id.toString()) {
    console.log("Not a Real user");
    throw new Error(`${req.user.firstName} is not the owner of the post `);
  }

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});
//-----------------------Delete post--------------------//
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMOongodbId(id);

  validateMOongodbId(id);
  const thispost = await Post.findById(id);

  if (thispost.user._id.toString() !== req.user._id.toString()) {
    console.log("Not a Real user");
    throw new Error(`${req.user.firstName} is not the owner of the post `);
  }
  try {
    const post = await Post.findByIdAndDelete(id);

    console.log(post?.user?._id);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});
//----------------------Like controllers------------------
const AddLike = asyncHandler(async (req, res) => {
  //find the post to be liked

  const { postId } = req.body;

  validateMOongodbId(postId);
  const post = await Post.findById(postId);
  //find the login user
  const loginUser = req?.user?.id;
  //find if this user has already liked the post
  const isLiked = post?.isLiked;
  //find if user has disliked the post
  const alreadyDisliked = post?.dislikes?.find(
    (userId) => userId?.toString() === loginUser.toString()
  );
  //remove the user from dislikes if exists
  if (alreadyDisliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { dislikes: loginUser }, isDisliked: false },
      { new: true }
    );
    res.json(post);
  }
  // console.log(alreadyDisliked);
  //Remove user if he has liked the post
  if (isLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: loginUser }, isLiked: false },
      { new: true }
    );
    res.send(post);
  } else {
    // add to likes
    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { likes: loginUser }, isLiked: true },
      { new: true }
    );
    await User.findByIdAndUpdate(post.user._id, { $inc: { points: 10 } });
    res.json(post);
  }
});
//-----------------------------dislikes-----------------------
const addDislike = asyncHandler(async (req, res) => {
  //1.Find the post to be disliled
  const { postId } = req.body;
  const post = await Post.findById(postId);
  //2.Find the login user
  const loginUser = req?.user?.id;
  //3.Check if this user has already disliked this post
  const isDisliked = post?.isDisLiked;
  //4.Check if userliked this post
  const alreadyliked = post?.likes?.find(
    (userId) => userId?.toString() === loginUser?.toString()
  );
  //5.rEMOVE THIS USER FROM lIKES ARRAY
  if (alreadyliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: loginUser }, isLiked: false },
      { new: true }
    );
    res.json(post);
  }
  // remove user from dislikes if already disliked
  if (isDisliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { dislikes: loginUser }, isDisLiked: false },
      { new: true }
    );
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { dislikes: loginUser }, isDisLiked: true },
      { new: true }
    );
    res.json(post);
  }
});
module.exports = {
  createPost,
  fetchallPosts,
  fetchSinglePost,
  updatePost,
  deletePost,
  AddLike,
  addDislike,
};
