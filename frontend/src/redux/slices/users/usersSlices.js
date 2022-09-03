import { createAsyncThunk, createSlice,createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";


const resetuserEditAction = createAction('user/reset');
const resetuserdeleteAction = createAction('user/delete-reset');
const resetuserupdateAction = createAction('user/update-reset');

//register action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${baseUrl}api/users/register`,
        user,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//update a user 
export const updateUserAction = createAsyncThunk(
  "users/update",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const users=getState()?.users;
       const {userAuth}=users;
       const config ={
        headers:{
           Authorization: 'Bearer '+userAuth.token
        }
       }
    //http call
    try {
      const { data } = await axios.put(
        `${baseUrl}api/users/`,
        user,
        config
      );
      dispatch(resetuserupdateAction());
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);


//Login action

export const loginUserAction=createAsyncThunk('user/login',async (userData,{rejectWithValue,getState,dispatch})=>{

const config={headers: {'Content-Type': 'application/json'}};

try {
  //making  http request
  

const {data}=await axios.post(`${baseUrl}api/users/login`,userData,config);
// save user data to localstorage
localStorage.setItem('userInfo', JSON.stringify(data));
return data;
} catch (error) {
  if(!error?.response){
    throw error;
  }
  return rejectWithValue(error?.response?.data);
}

});
//get user from localstorage place in store

//logfout action

export const logoutAction=createAsyncThunk('/user/logout',async (payload,{rejectWithValue,getState,dispatch})=>{
try {
  localStorage.removeItem('userInfo');
} catch (error) {
  if(!error?.response){
    throw error;
}
return rejectWithValue(error?.response?.data);
}
});
const userLoginFromStorage=localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null;

//get a user profile

export const userProfileAction= createAsyncThunk('/user/profile',async(id,{rejectWithValue,getState,dispatch})=>{
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
      const {data}=await axios.get(`${baseUrl}api/users/profile/${id}`,config);
      console.log(data);
    return data;
     } catch (error) {
      if(!error) {throw error}
      return rejectWithValue(error?.response?.data);
  }
});
//get a User feed

export const userFeedAction= createAsyncThunk('/user/feed',async(day,{rejectWithValue,getState,dispatch})=>{
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
      const {data}=await axios.get(`${baseUrl}api/users/feed?day=${day}`,config);
      console.log(data);
    return data;
     } catch (error) {
      if(!error) {throw error}
      return rejectWithValue(error?.response?.data);
  }
});

//Folllow

export const userFollowAction= createAsyncThunk('/user/follow',async(id,{rejectWithValue,getState,dispatch})=>{
  
       // get user token
       const users=getState()?.users;
       const {userAuth}=users;
       const config ={
        headers:{
           Authorization: 'Bearer '+userAuth.token
        }
       }
     try {
      const {data}=await axios.put(`${baseUrl}api/users/follow`,{followId:id},config);
    return data;
     } catch (error) {
      if(!error) {throw error}
      return rejectWithValue(error?.response?.data);
  }
});


//unfollow user

export const userUnFollowAction= createAsyncThunk('/user/unfollow',async(id,{rejectWithValue,getState,dispatch})=>{
  
  // get user token
  const users=getState()?.users;
  const {userAuth}=users;
  const config ={
   headers:{
      Authorization: 'Bearer '+userAuth.token
   }
  }
try {
 const {data}=await axios.put(`${baseUrl}api/users/unfollow`,{unfollowId:id},config);
return data;
} catch (error) {
 if(!error) {throw error}
 return rejectWithValue(error?.response?.data);
}
});




//upload profile photo
export const userProfileUploadAction= createAsyncThunk('/user/profile-photo',async(userImg,{rejectWithValue,getState,dispatch})=>{
  console.log(getState());
       // get user token
       console.log(userImg);
       const users=getState()?.users;
       const {userAuth}=users;
       const config ={
        headers:{
           Authorization: 'Bearer '+userAuth.token
        }
       }
     try {
      const formdata =  new FormData();
      formdata.append('image',userImg?.image);
      const {data}=await axios.put(`${baseUrl}api/users/profilephoto-upload`,formdata,config);
      dispatch(resetuserEditAction());
      return data;
     } catch (error) {
      if(!error) {throw error}
      return rejectWithValue(error?.response?.data);
  }
});





//slices

const usersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth:userLoginFromStorage,
  },
  extraReducers: builder => {
    //register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
     //profile
     builder.addCase(userProfileAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userProfileAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userProfileAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });



      //feed of the user
      builder.addCase(userFeedAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(userFeedAction.fulfilled, (state, action) => {
        state.feed = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(userFeedAction.rejected, (state, action) => {
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
        state.loading = false;
      });




     //Follow a user
     builder.addCase(userFollowAction.pending, (state, action) => {
      state.floading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userFollowAction.fulfilled, (state, action) => {
      state.follow = action?.payload;
      state.unfollow = undefined;
      state.floading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userFollowAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.floading = false;
    });
    //UnFollow a user
    builder.addCase(userUnFollowAction.pending, (state, action) => {
      state.ufloading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userUnFollowAction.fulfilled, (state, action) => {
      state.unfollow = action?.payload;
      state.follow = false;
      state.ufloading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userUnFollowAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.ufloading = false;
    });

    //update
    builder.addCase(updateUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetuserupdateAction,(state,action)=>{
      state.isprofileUpdated=true;
     });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isprofileUpdated=false;
      state.userUpdated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //profile photo upload
    builder.addCase(userProfileUploadAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetuserEditAction,(state,action)=>{
      state.isUploaded=true;
     });
    builder.addCase(userProfileUploadAction.fulfilled, (state, action) => {
      state.profilePhoto = action?.payload;
      state.isUploaded=false;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userProfileUploadAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
   


    //logout
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading=false;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => { 
      state.userAuth=undefined;
      state.loading=false;
      state.appErr=undefined;
      state.serverErr=undefined;
    }); 
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.appErr=action?.payload?.message;
      state.serverErr=action?.error?.message;
      state.loading=false;
    });
  },
});
export default usersSlices.reducer;
