const multer= require('multer');
const sharp= require('sharp');
const multerStorage=multer.memoryStorage(); 
const path=require('path');
// for temporary storage

//file type check

const multerFilter= (req,file,cb)=>{

    // check file type

    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }
    else{
        cb({message:'Unsupported file type'},false);
    }
}


const photoupload=multer({
    storage:multerStorage,
    fileFilter:multerFilter,
    limits:{fileSize:100000000}

});



//Post image resizing 

const photoResize=async (req,res,next)=>{
    //check if their is nop file
    if(!req.file){
        return next();
    }
    req.file.filename=`user-${Date.now()}-${req.file.originalname}`;
   
     // resizing the size of uploaded file
    await sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({quality:90}).toFile(path.join(`public/images/postimages/${req.file.filename}`));
    next();
    
}
const profilephotoResize=async (req,res,next)=>{
    //check if their is nop file
    if(!req.file){
        return next();
    }
    req.file.filename=`user-${Date.now()}-${req.file.originalname}`;
   
     // resizing the size of uploaded file
    await sharp(req.file.buffer).resize(250,250).toFormat('jpeg').jpeg({quality:90}).toFile(path.join(`public/images/profile/${req.file.filename}`));
    next();
    
}
module.exports = {photoupload,profilephotoResize,photoResize};