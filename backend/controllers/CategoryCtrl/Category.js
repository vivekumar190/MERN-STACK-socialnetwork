const Category = require("../../model/Category/Category");
const asyncHandler = require('express-async-handler');


// -----------------create a new category---------------
const createCategory = asyncHandler(async(req,res)=>{
try {
    const category = await Category.create({
        user:req.user._id,
        title:req.body.title,
        logo:req.body.logo
    })
    res.json(category);
} catch (error) {
    res.json( error);
    
}


});
// fetch all catgory------------------------------
const fetchAllCategory = asyncHandler(async(req,res)=>{
    try {
        const category = await Category.find({
        }).populate('user').sort('_createdAt');
        res.json(category);
    } catch (error) {
        res.json( error);
        
    }
    });
//    fetch single category--------------------------
const fetchCategory = asyncHandler(async(req,res)=>{
        const {id}=req.params;
        try {
            const category = await Category.findById(id
            ).populate('user').sort('_createdAt');
            res.json(category);
        } catch (error) {
            res.json( error);
            
        }
 });
//---update a category------------------------------------
const updateCategory = asyncHandler(async(req,res)=>{
        const {id}=req.params;
        try {
            const category = await Category.findByIdAndUpdate(id,{title:req?.body?.title}
        ,{new:true});
            res.json(category);
        } catch (error) {
            res.json( error);
            
        }
 });
 const deleteCategory = asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try {
        const category = await Category.findByIdAndDelete(id);
        res.json(category);
    } catch (error) {
        res.json( error);
        
    }
});

    
module.exports ={createCategory,fetchAllCategory,fetchCategory,updateCategory,deleteCategory};