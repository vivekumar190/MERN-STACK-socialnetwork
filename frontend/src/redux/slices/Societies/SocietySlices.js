import {createAsyncThunk,createSlice,createAction} from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../utils/baseUrl';


const resetsociety = createAction('scocietycreate/reset');

//create a society 

export const CreatesocietyAction=createAsyncThunk('society/created',async(society,{rejectWithValue,dispatch,getState})=>{

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
        forData.append('title',society?.title);
        forData.append('description',society?.description);
        forData.append('handle',society?.handle);
        forData.append('image',society?.image);      
        console.log(forData);          
        const {data} =await axios.post(`${baseUrl}api/society/`,forData,config);
        dispatch(resetsociety());
        return data;
    } catch (error) {
        if(!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
    }

});
//fetch all society


export const fetchallsocietyAction=createAsyncThunk('society/list',async(p,{rejectWithValue,dispatch,getState})=>{

    const users=getState()?.users;
    const {userAuth}=users;
    const config ={
     headers:{
        Authorization: 'Bearer '+userAuth.token
     }
    }
   
    try {
       console.log(p.user);
    const {data} =await axios.get(`${baseUrl}api/society?p=${p}`,config);
    console.log(data);
    return data; 
        //http call          
       
    } catch (error) {
        if(!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
    }

});
export const fetchUsersocietyAction=createAsyncThunk('usersociety/list',async(user,{rejectWithValue,dispatch,getState})=>{

    const users=getState()?.users;
    const {userAuth}=users;
    const config ={
     headers:{
        Authorization: 'Bearer '+userAuth.token
     }
    }
   console.log(user);
    try {
      
    const {data} =await axios.get(`${baseUrl}api/society/usersocities`,config);
    console.log(data);
    return data; 
        //http call          
       
    } catch (error) {
        if(!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
    }

});

//fetch a single society
export const fetchsinglesocietyAction=createAsyncThunk('society/details',async(id,{rejectWithValue,dispatch,getState})=>{

    const users=getState()?.users;
    const {userAuth}=users;
    const config ={
     headers:{
        Authorization: 'Bearer '+userAuth.token
     }
    }
   
    try {
       
        //http call          
        const {data} =await axios.get(`${baseUrl}api/society/${id}`,config);
        return data;
    } catch (error) {
        if(!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
    }

});


//request join a society 


export const joinsocietyAction=createAsyncThunk('society/join',async(SocietyId,{rejectWithValue,dispatch,getState})=>{

    const users=getState()?.users;
    const {userAuth}=users;
    const config ={
     headers:{
        Authorization: 'Bearer '+userAuth.token
     }
    }
   console.log(SocietyId);
    try {
       
        //http call          
        const {data} =await axios.put(`${baseUrl}api/society/addtoawaited`,{SocietyId},config);
        return data;
    } catch (error) {
        if(!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
    }

});
//  promote to member

export const PromotetomembersocietyAction=createAsyncThunk('society/join-member',async(member,{rejectWithValue,dispatch,getState})=>{

    const users=getState()?.users;
    const {userAuth}=users;
    const config ={
     headers:{
        Authorization: 'Bearer '+userAuth.token
     }
    }
   console.log({member});
    try {
       
        //http call          
        const {data} =await axios.put(`${baseUrl}api/society/addmember`,member,config);
        return data;
    } catch (error) {
        if(!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
    }

});
//promotememberto tresurer
export const PromotetotresurersocietyAction=createAsyncThunk('society/treasurer',async(member,{rejectWithValue,dispatch,getState})=>{

    const users=getState()?.users;
    const {userAuth}=users;
    const config ={
     headers:{
        Authorization: 'Bearer '+userAuth.token
     }
    }

   console.log({member});
    try {
       
        //http call          
        const {data} =await axios.put(`${baseUrl}api/society/addtresurer`,member,config);
        return data;
    } catch (error) {
        if(!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
    }

});
//make some one vice president

export const PromotetovicepresidentsocietyAction=createAsyncThunk('society/vice-president',async(member,{rejectWithValue,dispatch,getState})=>{

    const users=getState()?.users;
    const {userAuth}=users;
    const config ={
     headers:{
        Authorization: 'Bearer '+userAuth.token
     }
    }
   console.log({member});
    try {
       
        //http call          
        const {data} =await axios.put(`${baseUrl}api/society/addvicepresident`,member,config);
        return data;
    } catch (error) {
        if(!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
    }

});

export const KickfromsocietyAction=createAsyncThunk('society/kick',async(member,{rejectWithValue,dispatch,getState})=>{

    const users=getState()?.users;
    const {userAuth}=users;
    const config ={
     headers:{
        Authorization: 'Bearer '+userAuth.token
     }
    }
   console.log({member});
    try {
       
        //http call          
        const {data} =await axios.put(`${baseUrl}api/society/removemember`,member,config);
        return data;
    } catch (error) {
        if(!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
    }

});



//scoiety slices
const Societyslice=createSlice({name:'society',initialState:{},extraReducers:(builder)=>{
    builder.addCase(CreatesocietyAction.pending,(state,action)=>{
        state.loading = true;
    });
    // builder.addCase(resetsociety,(state,action)=>{
    // state.isCreated=true;
    // });
    builder.addCase(CreatesocietyAction.fulfilled,(state,action)=>{
        state.societyCreated=action?.payload;
        state.loading = false;
        state.isCreated=false;
        state.appErr=undefined;
        state.serverErr=undefined;
    });
    builder.addCase(CreatesocietyAction.rejected,(state,action)=>{
        state.loading = false;
        state.appErr=action?.payload?.message;
        state.serverErr=action?.error?.message;
    });
    //fetch all society

    builder.addCase(fetchallsocietyAction.pending,(state,action)=>{
        state.loading = true;
    });
    
    builder.addCase(fetchallsocietyAction.fulfilled,(state,action)=>{
        state.societyList=action?.payload;
        state.loading = false;
        state.appErr=undefined;
        state.serverErr=undefined;
    });
    builder.addCase(fetchallsocietyAction.rejected,(state,action)=>{
        state.loading = false;
        state.appErr=action?.payload?.message;
        state.serverErr=action?.error?.message;
    });
       //fetch user society

       builder.addCase(fetchUsersocietyAction.pending,(state,action)=>{
        state.loading = true;
    });
    
    builder.addCase(fetchUsersocietyAction.fulfilled,(state,action)=>{
        state.usersocietyList=action?.payload;
        state.loading = false;
        state.appErr=undefined;
        state.serverErr=undefined;
    });
    builder.addCase(fetchUsersocietyAction.rejected,(state,action)=>{
        state.loading = false;
        state.appErr=action?.payload?.message;
        state.serverErr=action?.error?.message;
    });

    // fetch a single society

    builder.addCase(fetchsinglesocietyAction.pending,(state,action)=>{
        state.loading = true;
    });
    
    builder.addCase(fetchsinglesocietyAction.fulfilled,(state,action)=>{
        state.societydetails=action?.payload;
        state.loading = false;
        state.appErr=undefined;
        state.serverErr=undefined;
    });
    builder.addCase(fetchsinglesocietyAction.rejected,(state,action)=>{
        state.loading = false;
        state.appErr=action?.payload?.message;
        state.serverErr=action?.error?.message;
    });
     //request join society

     builder.addCase(joinsocietyAction.pending,(state,action)=>{
        state.loading = true;
    });
    
    builder.addCase(joinsocietyAction.fulfilled,(state,action)=>{
        state.joinRequested=action?.payload;
        state.loading = false;
        state.appErr=undefined;
        state.serverErr=undefined;
    });
    builder.addCase(joinsocietyAction.rejected,(state,action)=>{
        state.loading = false;
        state.appErr=action?.payload?.message;
        state.serverErr=action?.error?.message;
    });
    //promote to member
    builder.addCase(PromotetomembersocietyAction.pending,(state,action)=>{
        state.loading = true;
    });
    
    builder.addCase(PromotetomembersocietyAction.fulfilled,(state,action)=>{
        state.promotedtomember=action?.payload;
        state.loading = false;
        state.appErr=undefined;
        state.serverErr=undefined;
    });
    builder.addCase(PromotetomembersocietyAction.rejected,(state,action)=>{
        state.loading = false;
        state.appErr=action?.payload?.message;
        state.serverErr=action?.error?.message;
    });
    //promote member tyo tresurer 
      //promote to member
      builder.addCase(PromotetotresurersocietyAction.pending,(state,action)=>{
        state.loading = true;
    });
    
    builder.addCase(PromotetotresurersocietyAction.fulfilled,(state,action)=>{
        state.tresurer=action?.payload;
        state.loading = false;
        state.appErr=undefined;
        state.serverErr=undefined;
    });
    builder.addCase(PromotetotresurersocietyAction.rejected,(state,action)=>{
        state.loading = false;
        state.appErr=action?.payload?.message;
        state.serverErr=action?.error?.message;
    });
       //promote to vice-president
       builder.addCase(PromotetovicepresidentsocietyAction.pending,(state,action)=>{
        state.loading = true;
    });
    
    builder.addCase(PromotetovicepresidentsocietyAction.fulfilled,(state,action)=>{
        state.vicepresident=action?.payload;
        state.loading = false;
        state.appErr=undefined;
        state.serverErr=undefined;
    });
    builder.addCase(PromotetovicepresidentsocietyAction.rejected,(state,action)=>{
        state.loading = false;
        state.appErr=action?.payload?.message;
        state.serverErr=action?.error?.message;
    });
        //Kick from the society
        builder.addCase(KickfromsocietyAction.pending,(state,action)=>{
            state.loading = true;
        });
        
        builder.addCase(KickfromsocietyAction.fulfilled,(state,action)=>{
            state.kicked=action?.payload;
            state.loading = false;
            state.appErr=undefined;
            state.serverErr=undefined;
        });
        builder.addCase(KickfromsocietyAction.rejected,(state,action)=>{
            state.loading = false;
            state.appErr=action?.payload?.message;
            state.serverErr=action?.error?.message;
        });
    
}});
export default Societyslice.reducer;