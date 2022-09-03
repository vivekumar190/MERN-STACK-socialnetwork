import {createAsyncThunk,createSlice,createAction} from '@reduxjs/toolkit'

import axios from 'axios';
import { baseUrl } from '../../../utils/baseUrl';

//CREATE ACTION
export const createCommentAction= createAsyncThunk('/comment/create',async(comment,{rejectWithValue,getState,dispatch})=>{
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
        const {data}=await axios.post(`${baseUrl}api/comments`,{description:comment?.description,postId:comment?.postId},config);
        return data;
       } catch (error) {
        if(!error) {throw error}
        return rejectWithValue(error?.response?.data);
    }
    });
    export const deleteCommentAction= createAsyncThunk('/comment/delete',async(commentId,{rejectWithValue,getState,dispatch})=>{
        console.log(getState());
             // get user token
             console.log(commentId)
             const users=getState()?.users;
             const {userAuth}=users;
             const config ={
              headers:{
                 Authorization: 'Bearer '+userAuth.token
              }
             }
           try {
            const {data}=await axios.delete(`${baseUrl}api/comments/${commentId}`,config);
            return data;
           } catch (error) {
            if(!error) {throw error}
            return rejectWithValue(error?.response?.data);
        }
        });


    const commentSlices=createSlice({
        name:'comment',
        initialState:{},
        extraReducers:builder=>{
            //create a new comment
        builder.addCase(createCommentAction.pending,(state,action)=>{
         state.loading = true;
        });
        builder.addCase(createCommentAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.CommentCreated=action?.payload; 
            state.appError = undefined;
            state.serverErr=undefined; 
        });
        builder.addCase(createCommentAction.rejected,(state,action)=>{
            state.loading = false;
            state.CommentCreated=undefined;
            state.appError = action?.payload?.message;
           state.serverErr=action?.payload?.message; 
       });

       //delete comment
       builder.addCase(deleteCommentAction.pending,(state,action)=>{
        state.loading = true;
       });
       builder.addCase(deleteCommentAction.fulfilled,(state,action)=>{
           state.loading = false;
           state.Commentdeleted=action?.payload; 
           state.appError = undefined;
           state.serverErr=undefined; 
       });
       builder.addCase(deleteCommentAction.rejected,(state,action)=>{
           state.loading = false;
           state.Commentdeleted=undefined;
           state.appError = action?.payload?.message;
          state.serverErr=action?.payload?.message; 
      });
    },
});

export default commentSlices.reducer;