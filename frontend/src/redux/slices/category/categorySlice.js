import { createAsyncThunk,createSlice ,createAction} from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";

//action to redirect
const resetEditAction = createAction('category/reset');
const resetdeleteAction = createAction('category/delete-reset');
const resetCategoryAction = createAction('category/created');

//action
export const createCategoryAction= createAsyncThunk('/category/create',async(category,{rejectWithValue,getState,dispatch})=>{
console.log(getState());
     // get user token
     const users=getState()?.users;
     const {userAuth}=users;
     const config ={
      headers:{
         Authorization: 'Bearer '+userAuth.token
      }
     }
   try {
    const {data}=await axios.post(`${baseUrl}api/category`,{title:category?.title,logo:category?.logo},config);
  dispatch(resetCategoryAction());
    return data;
   } catch (error) {
    if(!error) {throw error}
    return rejectWithValue(error?.response?.data);
}
});

// fetch all categories

export const fecthCategoriesAction= createAsyncThunk('/category/fetch',async(category,{rejectWithValue,getState,dispatch})=>{
        // get user token
        const users=getState()?.users;
        const {userAuth}=users;
        const config ={
         headers:{
            Authorization: 'Bearer '+userAuth.token
         }
        }
      try {
       const {data}=await axios.get(`${baseUrl}api/category`,config);
     return data;
      } catch (error) {
       if(!error) {throw error}
       return rejectWithValue(error?.response?.data);
   }
   });
//update category
   export const updateCategoryAction= createAsyncThunk('/category/update',async(category,{rejectWithValue,getState,dispatch})=>{
      console.log(getState());
           // get user token
           const users=getState()?.users;
           const {userAuth}=users;
           const config ={
            headers:{
               Authorization: 'Bearer '+userAuth.token
            }
           }
         try {
          const {data}=await axios.put(`${baseUrl}api/category/${category.id}`,{title:category?.title
         },config);
         dispatch(resetEditAction());
        return data;

        // dispatch action to dispacth the updated data
        
         } catch (error) {
          if(!error) {throw error}
          return rejectWithValue(error?.response?.data);
      }
 });
 export const deleteCategoryAction= createAsyncThunk('/category/delete',async(id,{rejectWithValue,getState,dispatch})=>{
   console.log(getState());
        // get user token
        const users=getState()?.users;
        const {userAuth}=users;
        const config ={
         headers:{
            Authorization: 'Bearer '+userAuth.token
         }
        }
      try {
       const {data}=await axios.delete(`${baseUrl}api/category/${id}`,config);
     //dispatch custom action
     dispatch(resetdeleteAction());
       return data;
      } catch (error) {
       if(!error) {throw error}
       return rejectWithValue(error?.response?.data);
   }
});
export const fetchCategoryAction= createAsyncThunk('/category/details',async(id,{rejectWithValue,getState,dispatch})=>{
   console.log(getState());
        // get user token
        const users=getState()?.users;
        const {userAuth}=users;
        const config ={
         headers:{
            Authorization: 'Bearer '+userAuth.token
         }
        }
      try {
       const {data}=await axios.get(`${baseUrl}api/category/${id}`,config);
     return data;
      } catch (error) {
       if(!error) {throw error}
       return rejectWithValue(error?.response?.data);
   }
});







//slices

const categorySlices=createSlice({name:'category',initialState:{},extraReducers:(builder)=>
   {
      //create a new category
     builder.addCase(createCategoryAction.pending,(state,action)=>{
        state.loading = true;
     });
     builder.addCase(resetCategoryAction,(state,action)=>{
      state.isCreated = true;
   });
     builder.addCase(createCategoryAction.fulfilled,(state,action)=>{
        state.category=action?.payload;
        state.isCreated = false;
        state.loading=false;
        state.appError = undefined;
        state.serverErr=undefined;
     });
     builder.addCase(createCategoryAction.rejected,(state,action)=>{
        state.loading = false;
        state.appError = action?.payload?.message;
        state.serverErr=action?.error?.message;
     });
     //fetch  all category
     builder.addCase(fecthCategoriesAction.pending,(state,action)=>{
      state.loading = true;
     });
     builder.addCase(fecthCategoriesAction.fulfilled,(state,action)=>{
      state.categoryList=action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverErr=undefined;
     });
     builder.addCase(fecthCategoriesAction.rejected,(state,action)=>{
       state.loading = false;
       state.appError = action?.payload?.message;
       state.serverErr=action?.payload?.message;
     });
     //update slices
     builder.addCase(updateCategoryAction.pending,(state,action)=>{
      state.loading = true;
     });
     //DISPATCH ACTION
     builder.addCase(resetEditAction,(state,action)=>{
      state.isEdited=true;
     });
     builder.addCase(updateCategoryAction.fulfilled,(state,action)=>{
      state.updatedCategory=action?.payload;
      state.isEdited=false;
      state.loading = false;
      state.appError = undefined;
      state.serverErr=undefined;
     });
     builder.addCase(updateCategoryAction.rejected,(state,action)=>{
       state.loading = false;
       state.appError = action?.payload?.message;
       state.serverErr=action?.payload?.message;
     });
     //delete 
     builder.addCase(deleteCategoryAction.pending,(state,action)=>{
      state.loading = true;
     });
     //dispacth  action for is deleted
     builder.addCase(resetdeleteAction,(state,action)=>{
      state.isDeleted = true;
     });
     builder.addCase(deleteCategoryAction.fulfilled,(state,action)=>{
      state.deletedCategory=action?.payload;
      state.isDeleted = false;
      state.loading = false;
      state.appError = undefined;
      state.serverErr=undefined;
     });
     builder.addCase(deleteCategoryAction.rejected,(state,action)=>{
       state.loading = false;
       state.appError = action?.payload?.message;
       state.serverErr=action?.payload?.message;
     });
     //fetch single category
     builder.addCase(fetchCategoryAction.pending,(state,action)=>{
      state.loading = true;
     });
     builder.addCase(fetchCategoryAction.fulfilled,(state,action)=>{
      state.Category=action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverErr=undefined;
     });
     builder.addCase(fetchCategoryAction.rejected,(state,action)=>{
       state.loading = false;
       state.appError = action?.payload?.message;
       state.serverErr=action?.payload?.message;
     });
},
});

export default categorySlices.reducer;