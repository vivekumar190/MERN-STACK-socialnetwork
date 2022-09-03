const express=require('express');
const authMiddleware = require('../../middleware/auth/authMiddlewae');
const {createComment,fetchAllComment,fetchComment, updateComment, deleteComment}= require('../../controllers/comments/commentCtrl');
const commentRoutes=express.Router();

commentRoutes.post('/',authMiddleware,createComment);
commentRoutes.get('/',authMiddleware,fetchAllComment);
commentRoutes.get('/:id',authMiddleware,fetchComment);
commentRoutes.put('/:id',authMiddleware,updateComment);
commentRoutes.delete('/:id',authMiddleware,deleteComment);


module.exports=commentRoutes; 