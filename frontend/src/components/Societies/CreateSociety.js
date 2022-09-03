import React,{ useEffect } from "react";
import { Formik, useFormik } from "formik";
import{useDispatch, useSelector} from 'react-redux';
import Dropzone from 'react-dropzone';
import {Navigate} from 'react-router-dom';
import {Container, Card,Button,Input,Textarea, Loading,Text,Spacer, Progress} from "@nextui-org/react";
import styled from 'styled-components';
import * as Yup from "yup";
import { createPostAction } from "../../redux/slices/posts/postSlices";
import CategorySelector from "../categorySelector/CategorySelector";
import { fecthCategoriesAction } from "../../redux/slices/category/categorySlice";
import { CreatesocietyAction } from "../../redux/slices/Societies/SocietySlices";


//form schema
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("description is required"),
  handle: Yup.string().required("description is required"),
  image: Yup.string().required("description is required"),

  
});

//css for drop zone
// const Container = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   border-width: 2px;
//   border-radius: 2px;
//   border-style: dashed;
//   background-color: #fafafa;
//   color: #bdbdbd;
// border-color:'red'
//   transition: border 0.24s ease-in-out;
// `;





export default function CreatePost(props) {
  const dispatch=useDispatch();


  //select store data
  const society =useSelector(state=>state?.society);
  const {isCreated,loading,appErr,serverErr}=society;



  const formik = useFormik({
    initialValues: {
      title: "",
      description:'' ,
      handle:'',
      image:''
    
      
    },
    onSubmit: values => {
      const data={
        title:values?.title,
        description:values.description,
        handle:values.handle,
        image:values.image
      }
      //dispath the action
    dispatch(CreatesocietyAction(data));
    console.log(data);
    },
    validationSchema: formSchema,
  });
 
 
  if(isCreated){
    return <Navigate to='/posts'/>
  }


    return (
      
      
      <>
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {loading? <Progress
          indeterminated
          value={50}
          color="secondary"
          status="secondary"
        />:null} 
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
              Create And manage your Societies 
            </h2>
     
            <p className="mt-2 text-center text-sm text-gray-600">
              <p className="font-medium text-green-600 hover:text-indigo-500">
              Societies give power to collaborate communicate and track your Coummunity social presence 
              </p>
              <Spacer y={1} />
           
              {serverErr || appErr ? <Text color="error" size={20} >{serverErr}-😬{appErr}</Text> :null }
               <Spacer y={1} />
            </p>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className=" py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
               
                  <div className="mt-1">
                    {/* Title */}
                    <Input
                      label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                      id="title"
                      name="title"
                      type="title"
                      autoComplete="title"
                      bordered 
         
          color="primary"        
                    />
                  </div>
                  <div className="mt-1">
                    {/* Title */}
                    <Spacer y={1} />
                    {serverErr || appErr ? <Input
                    labelLeft="@"
                    value={formik.values.handle}
                    onChange={formik.handleChange("handle")}
                    onBlur={formik.handleBlur("handle")}
                      id="handle"
                      name="handle"
                      
                      clearable
                      bordered 
          label="Handle" 
          color="error"
          status="error"        
                    /> :<Input
                    labelLeft="@"
                    value={formik.values.handle}
                    onChange={formik.handleChange("handle")}
                    onBlur={formik.handleBlur("handle")}
                      id="handle"
                      name="handle"
                      
                      
                      bordered 
          label="Handle" 
          color="primary"        
                    /> }
                    
                  </div>

                  <div>
                  <Spacer x={5}/>
                  <Dropzone
                    onBlur={formik.handleBlur("image")}
                    accept="image/*,audio/*,video/*"
                    
                    onDrop={acceptedFiles => {
                      formik.setFieldValue("image", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="container">
                        <div
                          {...getRootProps({
                            className: "dropzone",
                            onDrop: event => event.stopPropagation(),
                          })}
                        >
                          <input {...getInputProps()} />
                          <p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
                           <Text color="success"> select image or a video</Text> 
                          </p>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  </div>
                  {/* Err msg */}
                  <div className="text-red-500">
                    {formik.touched.title && formik.errors.title && formik.touched.errors?.title} 
                  </div>
                </div>

  
    <Spacer x={20}/>
    
                <div>
                  {/* Description */}
                  <Textarea
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
                    rows="5"
                    cols="50"
                    bordered
                    color="secondary"
                   labelPlaceholder="Description"
                    type="text"
                  ></Textarea>
                  {/* image upload*/ }
                  <Spacer x={5}/>

                  {/* Err msg */}               
                </div> 
                <div>
                  {/* Submit btn */}
                  {loading?  <Button
                    disabled
                    color='secondary'
                  >
                                      <Loading type="points-opacity" color="currentColor" size="sm" />

                  </Button> :
                   <Button
                  type="submit"
                  color='secondary'
                 >
                  Create Post
                 </Button>}

       
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
  