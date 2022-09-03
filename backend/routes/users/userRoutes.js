const express=require('express');
const { register, login, fetchallUsers, deleteUser, fetchUser, passwordUpdate,userProfile, userFeed,UpdateUser ,upateUserPassword,followingUser, unfollowUser,blockUser,unblockUser,profilePhotoUpload, generateverificationToken,accountVerification,forgetPassword} = require('../../controllers/users/userctrl'); 
const authMiddleware = require('../../middleware/auth/authMiddlewae');
const userRoutes=express.Router();
const {photoupload,profilephotoResize}=require('../../middleware/upload/photoupload');
userRoutes.post('/register',register);
userRoutes.post('/login',login);
userRoutes.put('/profilephoto-upload',authMiddleware,photoupload.single('image'),profilephotoResize,profilePhotoUpload);
userRoutes.get('/',authMiddleware,fetchallUsers);
userRoutes.get('/feed',authMiddleware,userFeed);
userRoutes.delete('/:id',deleteUser);
userRoutes.get('/:id',fetchUser);
userRoutes.get('/profile/:id',authMiddleware,userProfile);
userRoutes.put('/follow',authMiddleware,followingUser);
userRoutes.post('/generate-verify-email-token',authMiddleware,generateverificationToken);
userRoutes.post('/verify-account',authMiddleware,accountVerification);
userRoutes.put('/block-user/:id',authMiddleware,blockUser);
userRoutes.put('/unblock-user/:id',authMiddleware,unblockUser);
userRoutes.put('/unfollow',authMiddleware,unfollowUser);
userRoutes.put('/password',authMiddleware,upateUserPassword);
userRoutes.post('/forget-password-token',authMiddleware,forgetPassword);
userRoutes.put('/forget-password-reset',authMiddleware,passwordUpdate);
userRoutes.put('/',authMiddleware,UpdateUser);



// auth middle ware will have all the info of user
 
module.exports= userRoutes;