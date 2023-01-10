import * as React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Users/register/Register";
import Login from "./components/Users/login/Login";
import Navbar from "./components/Navigation/Navbar";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import { useSelector } from "react-redux";
import CreatePost from "./components/Posts/CreatePost";
import PostsList from "./components/Posts/PostList";
import UpdatePost from "./components/Posts/UpdatePost";
import Profile from "./components/Users/Profile/Profile";
import UploadProfilePhoto from "./components/Users/Profile/UploadProfilePhoto";
import UpdateProfileForm from "./components/Users/Profile/UpdateProfileForm";
import CreateSociety from "./components/Societies/CreateSociety";
import SocietiesList from "./components/Societies/SocietiesList";
import SingleSociety from "./components/Societies/SingleSociety";
import CreateCommunityPost from "./components/Posts/CreateCommunityPost";
import MessageWindow from "./components/HomePage/MessageWindow";
import ChatScreen from "./components/chatscreen/ChatScreen";
// 1. import `NextUIProvider` component

function App() {
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;

  return (
    <NextUIProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/society-post/:id"
            element={
              userAuth ? <CreateCommunityPost /> : <Navigate to="/login" />
            }
          />
          <Route
            exact
            path="/update-post/:id"
            element={userAuth ? <UpdatePost /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/profile/:id"
            element={userAuth ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/worldchat"
            element={userAuth ? <MessageWindow /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/create-society"
            element={userAuth ? <CreateSociety /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/societies/:id"
            element={userAuth ? <SingleSociety /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/societies"
            element={userAuth ? <SocietiesList /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/profile-photo-upload/:id"
            element={
              userAuth ? <UploadProfilePhoto /> : <Navigate to="/login" />
            }
          />
          <Route
            exact
            path="/update-profile/:id"
            element={
              userAuth ? <UpdateProfileForm /> : <Navigate to="/login" />
            }
          />
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/posts" element={<PostsList />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/add-category"
            element={
              userAuth?.isAdmin ? <AddNewCategory /> : <Navigate to="/login" />
            }
          />
          <Route
            exact
            path="/category-list"
            element={
              userAuth?.isAdmin ? <CategoryList /> : <Navigate to="/login" />
            }
          />
          <Route
            exact
            path="/create-post"
            element={userAuth ? <CreatePost /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/chat"
            element={userAuth ? <ChatScreen /> : <Navigate to="/login" />}
          />

          <Route
            exact
            path="/update-category/:id"
            element={<UpdateCategory />}
          />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
