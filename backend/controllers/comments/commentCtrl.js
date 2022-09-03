const Comment = require("../../model/comment/Comment");
const Post=require('../../model/post/Post');
const User = require("../../model/user/User");
const asyncHandler = require('express-async-handler');
const validateMOongodbId = require("../../utils/validatemongodbid");




//--------------------create a comment--------------------
const  createComment = asyncHandler(async(req,res)=>{
   // Get the user
   const user =  req.user;
   //Get the post id
   const {postId}=req.body;
   validateMOongodbId(postId);
   const post = await Post.findById(postId);
   try {
    const comment= await Comment.create({post:postId,user:user,description:req.body.description});
    await User.findByIdAndUpdate(post.user._id,{$inc:{points:1}});
    res.json(comment);
   } catch (error) {
    res.json({error});
   }
});
//-------------------fetch all comment from a post-----------
const fetchAllComment=asyncHandler(async(req,res)=>{
    try {
        const  comments = await Comment.find({}).sort('-createdAt');
        res.json({comments: comments});
    } catch (error) {
        res.json(error);
    }

});
// fetch single comment from----------------------
const fetchComment=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMOongodbId(id);
    try {
        const  comment = await Comment.findById(id);
        res.json(comment);
    } catch (error) {
        res.json(error);
    }
});
//update a comment
const updateComment=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const comment=  await Comment.findById(id);
    
    try {
        if(comment.user._id.toString()===req.user._id.toString()){
            console.log("Real user");
            const {id}=req.params;
            validateMOongodbId(id);
           const  comment = await Comment.findByIdAndUpdate(id,{post:req.body?.postId,user:req?.user,description:req?.body?.description},{new:true,runValidators:true });
           res.json(comment);   
        }
      else{
        res.json(`${req.user.firstName} is not the ownerof comment create by ${comment.user.firstName}`);
      }
        
    } catch (error) {
        res.json(error);
    }
    
 
   
});
//-------------------delete a comment-------------
const deleteComment=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const comment=  await Comment.findById(id);
    validateMOongodbId(id);
    try {
        if(comment.user._id.toString()===req.user._id.toString()){
            const  comment = await Comment.findByIdAndDelete(id);
            res.json(comment);
        }
        else{
            res.json(`${req.user.firstName} is not the ownerof comment create by ${comment.user.firstName}`);
        }
    } catch (error) {
        res.json(error);
    }
});


module.exports ={createComment,fetchAllComment,fetchComment,updateComment,deleteComment};