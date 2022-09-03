const mongoose = require('mongoose');

const postSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,'post category required'],
        trim:true
    },
    xp:{
        type:Number,
        default:0
    },
    handle:{
        type:String,    
        required: [true,"Handle is required"], 
        
    },
    president:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    vicepresident:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    treasurer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        
    },
    members:[
           {
            type:mongoose.Schema.Types.ObjectId,
           ref:'User'
           }
    ],
    awaitedmembers:[
        {
         type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        }
    ],
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
    founder:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'Author is required'],
    },
    zone:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Zone',
    },
    description:{
        type:String,
        required:[true,'society description required'],
    },
    logo:{
        type:String,
        default:'https://cdn-icons-png.flaticon.com/512/3314/3314560.png'
    },
    tags:[{ type:String,}
    ]
},{toJSON:{virtuals:true},toObject:{
    virtuals:true,
},timestamps:true});


// populating the comment
postSchema.virtual('posts',{
    ref:'Post',
    foreignField:'society',
    localField:'_id'
});


//compiling the post

const Society=mongoose.model('Society',postSchema);

module.exports=Society;