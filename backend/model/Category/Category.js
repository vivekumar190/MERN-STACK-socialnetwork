const mongoose = require('mongoose');
const Categoryschema = new  mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
    type:String,
    required:true
    }
   ,
   logo:{
    type:String,
    required:true
   }


},{timestamps:true});
const Category=mongoose.model('Category',Categoryschema);

module.exports =Category;