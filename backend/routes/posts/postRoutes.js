const express=require('express');
const multer = require('multer');
const {createPost,fetchallPosts,updatePost, fetchSinglePost, deletePost, AddLike, addDislike}=require('../../controllers/posts/postCtrl');
const authMiddleware = require('../../middleware/auth/authMiddlewae');
const {photoupload,photoResize}=require('../../middleware/upload/photoupload');
const postRoutes=express.Router();
const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname)
    },
})


const upload = multer({ storage: storage,fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == 'video/mp4'  ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg and mp4 format allowed!'));
    }
  },});
postRoutes.post('/',authMiddleware,upload.single('image'),createPost);
postRoutes.get('/',fetchallPosts);
postRoutes.get('/:id',fetchSinglePost);
postRoutes.put('/like',authMiddleware,AddLike);
postRoutes.put('/dislike',authMiddleware,addDislike);
postRoutes.put('/:id',authMiddleware,updatePost);
postRoutes.delete('/:id',authMiddleware,deletePost);

module.exports=postRoutes;