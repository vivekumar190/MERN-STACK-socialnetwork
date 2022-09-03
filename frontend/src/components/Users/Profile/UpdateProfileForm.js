import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Navigate, Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Button, Input, Text, Textarea } from "@nextui-org/react";
import { updateUserAction, userProfileAction } from "../../../redux/slices/users/usersSlices";
//Form schema

const formSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  bio: Yup.string().required("Bio is required"),
});

const UpdateProfileForm = () => {

const {id} =useParams();
  const dispatch= useDispatch();
  useEffect(()=>{
    dispatch(userProfileAction(id));
  },[dispatch,id]);
  //formik


  // select state from store


  const users=useSelector(state=>state.users);
  const {profile,loading,appErr,serverErr,isprofileUpdated}=users;

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
    },
    onSubmit: values => {
      //dispath the action
      dispatch(updateUserAction(values));
      console.log(values);
    },
    validationSchema: formSchema,
  });
  
  if(isprofileUpdated){
    return <Navigate to={`/profile/${users?.userAuth?._id}`}/>
  }

  return (
    <div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-600">
          you want to update your profile?
        </h3>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-grey py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <div className="mt-1">
                {/* First name */}
                <Input 
                  value={formik.values.firstName}
                  onChange={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="firstName"
                  placeholder={profile?.user?.firstName}
                  
                />
              </div>
              <div className="text-red-500">
                {formik.touched.firstName && formik.errors.firstName}
              </div>
            </div>
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <div className="mt-1">
                {/* Last Name */}
                <Input
                  value={formik.values.lastName}
                  onChange={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")}
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="lastName"
                  placeholder={profile?.user?.lastName}
                />
              </div>
              {/* Err msg */}
              <div className="text-red-500">
                {formik.touched.lastName && formik.errors.lastName}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                {/* Email */}
                <Input
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={profile?.user?.email}
                />
              </div>
              {/* err msg */}
              <div className="text-red-500">
                {formik.touched.email && formik.errors.email}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <Textarea
                value={formik.values.bio}
                onChange={formik.handleChange("bio")}
                onBlur={formik.handleBlur("bio")}
                rows="5"
                cols="50"
                placeholder={profile?.user?.bio}
                type="text"
              ></Textarea>
              {/* Err msg */}
              <div className="text-red-500">
                {formik.touched.bio && formik.errors.bio}
              </div>
            </div>
            <div>
              {/* submit btn */}
              <Button
                type="submit"
                color='secondary'
              >
                Update
              </Button>
            </div>
          </form>

          <div className="mt-4 mb-3">
            <div className="relative">
              <div className="flex flex-col justify-center items-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
