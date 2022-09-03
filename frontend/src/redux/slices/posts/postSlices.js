import {createAsyncThunk,createSlice,createAction} from '@reduxjs/toolkit'
import axios from 'axios';
import { baseUrl } from '../../../utils/baseUrl';


const resetpost = createAction('postcreate/reset');
// const resetdeleteAction = createAction('category/delete-reset');
// const resetCategoryAction = createAction('category/created');
const resetpostEdit = createAction('postedit/reset');
const resetpostdelete = createAction('postdelete/reset');

//create post action
export const createPostAction = createAsyncThunk('post/created',async(post,{rejectWithValue,getState,dispatch})=>{

    const users=getState()?.users;
    const {userAuth}=users;
    const config ={
     headers:{
        Authorization: 'Bearer '+userAuth.token
     }
    }

    try {
       
        //http call
        const forData =  new FormData();
        forData.append('title',post?.title);
        forData.append('description',post?.description);
        forData.append('category',post?.category);
        forData.append('image',post?.image);
         if(post?.society){
            forData.append('society',post?.society);
         }
                       
        console.log(post);
        const {data} =await axios.post(`${baseUrl}api/posts/`,forData,config);
        dispatch(resetpost());
        return data;
    } catch (error) {
        if(!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
    }

});
//update post action
export const updatePostAction = createAsyncThunk('post/updated',async(post,{rejectWithValue,getState,dispatch})=>{

    const users=getState()?.users;
    const {userAuth}=users;
    const config ={
     headers:{
        Authorization: `Bearer ${userAuth.token}`
     }
    }

    try {
        console.log(post?.id);
        //  const id=post?.id;
        // const forData =  new FormData();
        // forData.append('title',post?.title);
        // forData.append('description',post?.description);

        
        const {data} =await axios.put(`${baseUrl}api/posts/${post?.id}`,{title:post.title,description:post.description},config);
        dispatch(resetpostEdit());
        return data;
    } catch (error) {
        if(!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
    }

});

//deleyte a post


export const deletePostAction = createAsyncThunk('post/delete',async(postId,{rejectWithValue,getState,dispatch})=>{

    const users=getState()?.users;
    const {userAuth}=users;
    const config ={
     headers:{
        Authorization: `Bearer ${userAuth.token}`
     }
    }

    try { 
        const {data} =await axios.delete(`${baseUrl}api/posts/${postId}`,config);
        dispatch(resetpostdelete());
        return data;
    } catch (error) {
        if(!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
    }

});



// fetch all posts
export const fetchPostsAction = createAsyncThunk('post/list',async(parameters,{rejectWithValue,getState,dispatch})=>{

   

    try {
        if(parameters?.society){
            const {data} =await axios.get(`${baseUrl}api/posts?society=${parameters?.society}`);
            console.log(parameters?.society);
            return data; 
        }
        //http call
        const {data} =await axios.get(`${baseUrl}api/posts?category=${parameters?.category}&&?p=${parameters.pageNumber}`);
       
        return data;
    } catch (error) {
        if(!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
    }

});
//fetch post details
export const fetchPostDetailsAction = createAsyncThunk(
    "post/detail",
    async (id, { rejectWithValue, getState, dispatch }) => {
      try {
        const { data } = await axios.get(`${baseUrl}api/posts/${id}`);
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );


// lika post 

export const toggleAddLikeToPost=createAsyncThunk('post/like',async(postId,{rejectWithValue,getState,dispatch})=>{
   
    const users=getState()?.users;
    const {userAuth}=users;
    const config ={
     headers:{
        Authorization: `Bearer ${userAuth.token}`
     }
    }
   
    try {
        const {data} = await axios.put(`${baseUrl}api/posts/like/`,{postId:postId},config);
        return data;
    } catch (error) {
        console.log(error);
        if(!error?.response) throw error;

        return rejectWithValue(error?.response?.data);
        
    }
});

export const toggleAdddisLikeToPost=createAsyncThunk('post/dislike',async(postId,{rejectWithValue,getState,dispatch})=>{
   
    const users=getState()?.users;
    const {userAuth}=users;
    const config ={
     headers:{
        Authorization: `Bearer ${userAuth.token}`
     }
    }
   
    try {
        const {data} = await axios.put(`${baseUrl}api/posts/dislike/`,{postId:postId},config);
        return data;
    } catch (error) {
        console.log(error);
        if(!error?.response) throw error;

        return rejectWithValue(error?.response?.data);
        
    }
});


//slices

const postSlice=createSlice({name:'post',initialState:{},extraReducers:(builder)=>{
    //create post
    builder.addCase(createPostAction.pending,(state,action)=>{
        state.loading = true;
    });
    builder.addCase(resetpost,(state,action)=>{
    state.isCreated=true;
    });
    builder.addCase(createPostAction.fulfilled,(state,action)=>{
        state.postCreated=action?.payload;
        state.loading = false;
        state.isCreated=false;
        state.appErr=undefined;
        state.serverErr=undefined;
    });
    builder.addCase(createPostAction.rejected,(state,action)=>{
        state.loading = false;
        state.appErr=action?.payload?.message;
        state.serverErr=action?.error?.message;
    });
    //update post
    builder.addCase(updatePostAction.pending,(state,action)=>{
        state.loading = true;
    });
    builder.addCase(resetpostEdit,(state,action)=>{
    state.isUpdated=true;
    });
    builder.addCase(updatePostAction.fulfilled,(state,action)=>{
        state.postUpdated=action?.payload;
        state.loading = false;
        state.isUpdated=false;
        state.appErr=undefined;
        state.serverErr=undefined;
    });
    builder.addCase(updatePostAction.rejected,(state,action)=>{
        state.loading = false;
        state.appErr=action?.payload?.message;
        state.serverErr=action?.error?.message;
    });
    //delete action

    builder.addCase(deletePostAction.pending,(state,action)=>{
        state.loading = true;
    });
    builder.addCase(resetpostdelete,(state,action)=>{
    state.isDeleted=true;
    });
    builder.addCase(deletePostAction.fulfilled,(state,action)=>{
        state.postdeleted=action?.payload;
        state.loading = false;
        state.isDeleted=false;
        state.appErr=undefined;
        state.serverErr=undefined;
    });
    builder.addCase(deletePostAction.rejected,(state,action)=>{
        state.loading = false;
        state.appErr=action?.payload?.message;
        state.serverErr=action?.error?.message;
    });


        //fetch post
        builder.addCase(fetchPostsAction.pending,(state,action)=>{
            state.loading = true;
        });
        builder.addCase(fetchPostsAction.fulfilled,(state,action)=>{
            state.postLists=action?.payload;
            state.loading = false;
            state.isCreated=false;
            state.appErr=undefined;
            state.serverErr=undefined;
        });
        builder.addCase(fetchPostsAction.rejected,(state,action)=>{
            state.loading = false;
            state.appErr=action?.payload?.message;
            state.serverErr=action?.error?.message;
        });

        //single post
        //fetch post Details
    builder.addCase(fetchPostDetailsAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
        state.postDetails = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(fetchPostDetailsAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });





        //like post
        builder.addCase(toggleAddLikeToPost.pending,(state,action)=>{
            state.loading = true;
        });
        builder.addCase(toggleAddLikeToPost.fulfilled,(state,action)=>{
            state.likes=action?.payload;
            state.loading = false;
            state.appErr=undefined;
            state.serverErr=undefined;
        });
        builder.addCase(toggleAddLikeToPost.rejected,(state,action)=>{
            state.loading = false;
            state.appErr=action?.payload?.message;
            state.serverErr=action?.error?.message;
        });
        //dislike post
        builder.addCase(toggleAdddisLikeToPost.pending,(state,action)=>{
            state.loading = true;
        });
        builder.addCase(toggleAdddisLikeToPost.fulfilled,(state,action)=>{
            state.likes=action?.payload;
            state.loading = false;
            state.appErr=undefined;
            state.serverErr=undefined;
        });
        builder.addCase(toggleAdddisLikeToPost.rejected,(state,action)=>{
            state.loading = false;
            state.appErr=action?.payload?.message;
            state.serverErr=action?.error?.message;
        });
}});
export default postSlice.reducer;