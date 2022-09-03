const mongoose = require('mongoose');
const zoneschema = new  mongoose.Schema({
    title:{
    type:String,
    required:true
    },
    zoneid:{
        type:String,
        required:true 
    },
    description:{
        type:String,
        required:true 
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    chief:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    secretary:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    zonepoints:{
        type:Number,
        default:0
    },
    logo:{
        type:String,
        required:true
    },
    website:{
        type:String,
        required:false
    }   
    
},{timestamps:true});
const Zone=mongoose.model('Zone',zoneschema);

module.exports =Zone;