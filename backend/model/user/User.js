const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const crypto = require('crypto');

//create schema object
const userSchema = new mongoose.Schema({ 
    firstName:{
        required: [true,"First Name is required"], 
        type: String,
    },
    lastName:{
        required: [true,"Last Name is required"], 
        type: String,
    },
    profilePhoto: { 
        type:String,  
          default:'https://cdn-icons-png.flaticon.com/512/1998/1998657.png'
        },
    email:{
        type:String,    
        required: [true,"Email is required"], 
        
    },
    username:{
        type:String,    
        required: [true,"username is required"], 
        
    },
    bio:{
      type:String, 
      
    },
    password: { 
        type:String, 
        required: [true,"Password is required"], 
    },
    postCount:{
        type:Number,
        default: 0,
        },
    isBlocked:{
                type:Boolean,
                default: false,
    },
    isAdmin:{
        type:Boolean,
        default: false,
    },
  
    role:{
        type:String,
        enum: ['Admin','President','vice-president','Member','Asshole'] 
    },
    isFollowing:{
        type:Boolean,
        default: false,
    },
    isUnFollowing:{
        type:Boolean,
        default: false,
    },
    isAccountVerified:{ 
        type:Boolean, 
        default: false,
    },
    accountVerificationToken:
    String,
    accountVerificationTokenExpires:{
        type:Date,
    },
    viewedBy:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    }]
    },
    society:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Society',
        // required:[true,'Author is required'],
    },
    memberof:{type:[{type:mongoose.Schema.Types.ObjectId,
        ref:'Society'
    }]    // required:[true,'Author is required'],
    },

    followers:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    }],
    },
    following:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    }],
    },
    passwordChangeAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,

    active:{
        type:Boolean,
    default:false,
 },

// will be implemented later




    zone:{type:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Zone'
    }]},
    points:{
        type:Number,
     default:0 
    },
    rank:{
     type:Number,
     default:0  
    },
    isTrending:{
     type:Boolean,
     default:false,
    },


},{toJSON:{
    virtuals:true,

},
toObject:{
    virtuals:true,
    
},
timestamps:true,

})
//virtual methods to poluate created posts
userSchema.virtual('posts',{
ref:'Post',
foreignField:'user',
localField:'_id'
});
//virtual method to populate socitiesassociated with this memeber

// userSchema.virtual('socities',{
//     ref:'Society',
//     foreignField:'members',
//     localField:'_id'
// });


// hsashing the password    MIDDLEWARE


userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    // using bcrypt to hash password
    var salt = await bcrypt.genSaltSync(10);
    this.password=await bcrypt.hash(this.password,salt);
next();
})


//comparing the passsword MIDDLEWARE

userSchema.methods.isPasswordMatched =async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
    }

// verify account
userSchema.methods.createAccountVerificationtoken=async function(){
    //create token
    const verificationToken=crypto.randomBytes(32).toString("hex");
    this.accountVerificationToken=crypto.createHash('sha256').update(verificationToken).digest('hex');
    this.accountVerificationTokenExpires=Date.now()+30*60*1000;//10 minutes 
    return verificationToken;
};
// passwordf reset/forget password account
userSchema.methods.passwordresetToken=async function(){
    //create token
    const resetToken=crypto.randomBytes(32).toString("hex");
    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires=Date.now()+30*60*1000;//10 minutes 
    return resetToken;
};
// compile schema into model
module.exports =mongoose.model('User', userSchema);