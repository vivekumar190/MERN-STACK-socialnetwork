const express=require('express');
const {CreateSociety,fetchAllSociety,addToAwaiedSociety,addMemberToSociety,fetchUserSocieteis,NewTresurerToSociety,fetchSingleSociety,removeMemberfromSociety,addVicepresidentToSociety,NewpresidentToSociety} = require('../../controllers/societyCtrl/societyCtrl');
const authMiddleware = require('../../middleware/auth/authMiddlewae');
const {photoupload,profilephotoResize}=require('../../middleware/upload/photoupload');
const societyRoutes=express.Router();
societyRoutes.post('/',authMiddleware,photoupload.single('image'),profilephotoResize,CreateSociety);
societyRoutes.put('/addtoawaited',authMiddleware,addToAwaiedSociety);
societyRoutes.put('/addmember',authMiddleware,addMemberToSociety);
societyRoutes.put('/removemember',authMiddleware,removeMemberfromSociety);
societyRoutes.put('/addvicepresident',authMiddleware,addVicepresidentToSociety);
societyRoutes.put('/updatepresident',authMiddleware,NewpresidentToSociety);
societyRoutes.put('/addtresurer',authMiddleware,NewTresurerToSociety);
societyRoutes.get('/',fetchAllSociety);
societyRoutes.get('/usersocities',authMiddleware,fetchUserSocieteis);
societyRoutes.get('/:id',authMiddleware,fetchSingleSociety);




module.exports=societyRoutes;