const Post=require('../../model/post/Post');
const User=require('../../model/user/User');
const Society=require('../../model/Society/Society');
const asyncHandler = require('express-async-handler');
const validateMOongodbId = require('../../utils/validatemongodbid');

//createa  a society

const CreateSociety=asyncHandler(async(req,res)=>{
const {_id}=req?.user;
const  user=await User.findById(_id);
if(!user?.points>=100 || user?.followers?.length>=100){
    throw new Error('you must have 1000 🏆 or min 100 followers');
}
const societyexists =await Society.findOne({handle:req?.body?.handle});
if(societyexists)
{
    throw new Error('Society with this handle already exists');
} 
const localpath=`http://192.168.1.4:5000/public/images/profile/${req.file.filename}`;
try {
     const society=await Society.create({...req.body,president:_id,founder:_id,title:req.body.title,logo:localpath});
     await User.findByIdAndUpdate(_id,{$inc:{points:5},society:society._id});   
     res.json(society);
} catch (error) {
    res.json(error);
}
});
// fethc all societies

const fetchAllSociety=asyncHandler(async(req,res)=>{
   
   const page=req?.query?.p;
      
    try { 
         const societies=await Society.find({}).limit((page-0)*5).populate('members').populate('president').populate('posts').populate('vicepresident').populate('treasurer').populate('vicepresident').sort('-xp'); 
         res.json(societies);
    } catch (error) {
        res.json(error);
    }
    });
    // fethc all societies

const fetchUserSocieteis=asyncHandler(async(req,res)=>{
   
    const {_id}=req?.user;
  
    const feeduser=await User.findById(_id);
    const list=feeduser.memberof
    const realsocietyarray=list?.map(society=>society._id.toString());
       
     try { 
          const societies=await Society.find({_id:realsocietyarray}).populate('members').populate('president').populate('posts').populate('vicepresident').populate('treasurer').populate('vicepresident').sort('-xp'); 
          res.json(societies);
     } catch (error) {
         res.json(error);
     }
     });


    //fetch single society


    const fetchSingleSociety=asyncHandler(async(req,res)=>{
    const {id}=req.params;
        try {
             const societies=await Society.findById(id).populate('members').populate('awaitedmembers').populate('president').populate('posts').populate('vicepresident').populate('treasurer').sort('-createdAt'); 
             await Society.findByIdAndUpdate(id,{$inc:{xp:2,numViews:1}});
             res.json(societies);
        } catch (error) {
            res.json(error);
        }
        });

    // add member  to awaited list
const addToAwaiedSociety=asyncHandler(async(req,res)=>{
    const {_id}=req?.user;
    const {SocietyId}=req.body;
    const societytest=await Society.findById(SocietyId); 
    if(societytest?.members.includes(_id)){
        throw new Error(` already member`);
         }



    if(societytest?.awaitedmembers.includes(_id)){
   throw new Error(` already in awaited list`);
    }
    validateMOongodbId(SocietyId);
        try {
             const society=await Society.findByIdAndUpdate(req.body.SocietyId,{$push:{awaitedmembers:_id}},{new:true}); 
             res.json(society);
        } catch (error) {
            res.json(error);
        }
});

//this can only be triggered if login user is president or vice-president  admin or tresurer or secreteray
const addMemberToSociety=asyncHandler(async(req,res)=>{
    const {_id}=req?.user;
    const {societyId,memberId}=req?.body;
    validateMOongodbId(societyId);
    const societytest=await Society.findById(societyId); 
    if(!req?.user?._id.toString()==societytest?.president?._id.toString() || !req?.user?._id.toString()==societytest?.vicepresident?._id.toString() || !req?.user?._id.toString()==societytest?.treasurer?._id.toString()){
        throw new Error('Only president or admin or tresurer can add members');
    }
    //chechk if a requested member is a postion holder so we can remove it from tresaurer
    if(memberId.toString()==societytest?.treasurer?.toString()){
        const society=await Society.findByIdAndUpdate(req?.body?.societyId,{treasurer:null},{new:true});  
    }
    if(memberId.toString()==societytest?.vicepresident?.toString()){
        const society=await Society.findByIdAndUpdate(req?.body?.societyId,{vicepresident:null},{new:true});  
    }
    if(societytest?.members?.includes(memberId.toString())){
        throw new Error('already a member');
    }
        try {
             const society=await Society.findByIdAndUpdate(req?.body?.societyId,{$push:{members:memberId},$pull:{awaitedmembers:memberId}},{new:true}); 
             await User.findByIdAndUpdate(memberId,{$inc:{points:50},society:societyId,$push:{memberof:societyId}});
             res.json(society);
        } catch (error) {
            res.json(error);
        }
});
//remove a member
const removeMemberfromSociety=asyncHandler(async(req,res)=>{
    const {_id}=req?.user;
    const {societyId,memberId}=req?.body;
    validateMOongodbId(societyId);
    const societytest=await Society.findById(societyId); 
    if(!societytest?.members?.includes(memberId.toString())){
        throw new Error('this user is not a member of the society');
    }
    if(memberId.toString()===societytest?.president?._id.toString() || memberId==societytest?.vicepresident?._id.toString() ){
        throw new Error('Vice president should be demoted first and then removed president cant be removed');
    }
    if(!req?.user?._id.toString()==societytest?.president?._id.toString() ||!req?.user?._id.toString()==societytest?.vicepresident?._id.toString() ||!req?.user?._id.toString()==societytest?.treasurer?._id.toString()){
        throw new Error('Only president or admin or tresurer or member can remove people');
    }
    await Society.findByIdAndUpdate(req?.body?.societyId,{$push:{awaitedmembers:memberId}}); 
        try {
             const society=await Society.findByIdAndUpdate(req?.body?.societyId,{$pull:{members:memberId}},{new:true}); 
             await User.findByIdAndUpdate(memberId,{$inc:{points:-50},$pull:{memberof:societyId}});
             res.json(society);
        } catch (error) {
            res.json(error);
        }
});
//make some one vice-president
const addVicepresidentToSociety=asyncHandler(async(req,res)=>{

    const {_id}=req?.user;
    const {societyId,memberId}=req?.body;
    validateMOongodbId(societyId);
    const societytest=await Society.findById(societyId); 
    console.log(req?.user?._id.toString()===societytest?.president?._id.toString())
    if(req?.user?._id.toString()!==societytest?.president?._id.toString()){
        throw new Error('Only president can make some one vice-president');
    }
    if(!societytest?.members?.includes(memberId.toString())){
        throw new Error('add him a member first a member');
    }
    await Society.findByIdAndUpdate(req?.body?.societyId,{$push:{members:societytest?.vicepresident}}); 
    await User.findByIdAndUpdate(societytest?.vicepresident?._id,{$inc:{points:-100}});
        try {
             const society=await Society.findByIdAndUpdate(req?.body?.societyId,{vicepresident:memberId,$pull:{members:memberId}},{new:true}); 
             await User.findByIdAndUpdate(memberId,{$inc:{points:100},society:societyId});
             res.json(society);
        } catch (error) {
            res.json(error);
        }
});
//president can make some one lese president 
const NewpresidentToSociety=asyncHandler(async(req,res)=>{
    const {_id}=req?.user;
    const {societyId,memberId}=req?.body;
    validateMOongodbId(societyId);
    const societytest=await Society.findById(societyId); 
    // chechk if requested user is member or not 
    if(req?.user?._id.toString()===societytest?.president?._id.toString()){
        throw new Error('Only president can make some one President');
    }
    if(!societytest?.members?.includes(memberId.toString())){
        throw new Error('add him a member first a member');
    }

        try {
             const society=await Society.findByIdAndUpdate(req?.body?.societyId,{president:memberId,vicepresident:_id},{new:true}); 
             await User.findByIdAndUpdate(memberId,{$inc:{points:200},society:societyId});
             res.json(society);
        } catch (error) {
            res.json(error);
        }
});
const NewTresurerToSociety=asyncHandler(async(req,res)=>{
    const {_id}=req?.user;
    const {societyId,memberId}=req?.body;
    validateMOongodbId(societyId);
    const societytest=await Society.findById(societyId); 
  console.log(req?.user?._id!==societytest?.president._id)
    // chechk if requested user is member or not 
    if(!req?.user?._id.toString()==societytest?.president?._id.toString() || !req?.user?._id.toString()==societytest?.vicepresident?._id.toString()){
        throw new Error('Only president or vice-president can make some one Tresurer');
    }
    if(!societytest?.members?.includes(memberId.toString())){
        throw new Error('add him a member first a member');
    }
    await Society.findByIdAndUpdate(req?.body?.societyId,{$push:{members:societytest?.treasurer}}); 
    await User.findByIdAndUpdate(societytest?.treasurer?._id,{$inc:{points:-100}});
        try {
             const society=await Society.findByIdAndUpdate(req?.body?.societyId,{treasurer:memberId,$pull:{members:memberId}},{new:true}); 
             await User.findByIdAndUpdate(memberId,{$inc:{points:100},society:societyId});
             res.json(society);
        } catch (error) {
            res.json(error);
        }
});


//exporting a  all ther module
module.exports = {CreateSociety,fetchAllSociety,addToAwaiedSociety,addMemberToSociety,fetchUserSocieteis,removeMemberfromSociety,addVicepresidentToSociety,NewpresidentToSociety,NewTresurerToSociety,fetchSingleSociety};