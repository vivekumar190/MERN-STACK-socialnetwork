import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../slices/users/usersSlices';
import categoryReducer from '../slices/category/categorySlice';
import post from '../slices/posts/postSlices';
import comment from '../slices/comments/commentSlices';
import society from'../slices/Societies/SocietySlices';
const store = configureStore({
     reducer:{
        users:userReducer,
        category:categoryReducer,
        post,
        comment,
        society
     }
})
export default store;