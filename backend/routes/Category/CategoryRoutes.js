const {createCategory,fetchAllCategory,fetchCategory, updateCategory,deleteCategory}=require('../../controllers/CategoryCtrl/Category');
const express=require('express');
const categoryRoutes=express.Router();
const authMiddleware = require('../../middleware/auth/authMiddlewae');

categoryRoutes.post('/',authMiddleware,createCategory);
categoryRoutes.get('/',fetchAllCategory);
categoryRoutes.get('/:id',authMiddleware,fetchCategory);
categoryRoutes.put('/:id',authMiddleware,updateCategory);
categoryRoutes.delete('/:id',authMiddleware,deleteCategory);
module.exports = categoryRoutes; 