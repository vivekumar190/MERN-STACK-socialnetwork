const mongoose = require('mongoose');

const postSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,'post category required'],
        trim:true
    } ,
    society:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Society',
       
    },
    category:{
        type:String,
        required:[true,'post category required'],
      
    },
    isLiked:{
       type:Boolean,
       default: false,
    },
    isDisLiked:{
        type:Boolean,
        default: false,
     },
    numViews:{
    type:Number,
    default:0
    },
    likes:[
        {
         type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        }
    ],
    dislikes:[
        {
         type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        // required:[true,'Author is required'],
    },
    zone:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ZONE',
    },
    description:{
        type:String,
        required:[true,'post description required'],
    },
    image:{
        type:String,
        default:'https://odindesignthemes.com/vikinger/img/cover/04.jpg'
    }
    ,
    tags:[{ type:String,}
    ]
},{toJSON:{virtuals:true},toObject:{
    virtuals:true,
},timestamps:true});


// populating the comment
postSchema.virtual('comments',{
    ref:'Comment',
    foreignField:'post',
    localField:'_id'
});


//compiling the post

const Post=mongoose.model('Post',postSchema);

module.exports=Post;