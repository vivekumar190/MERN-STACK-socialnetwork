import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Navigate, Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Button, Image, Input, Loading,Card, Spacer, Text, Textarea } from "@nextui-org/react";
import { deletePostAction, fetchPostDetailsAction, updatePostAction } from "../../redux/slices/posts/postSlices";
import CategorySelector from "../categorySelector/CategorySelector";
import ReactPlayer from "react-player";


const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  // category: Yup.object().required("Category is required"),
});

export default function UpdatePost() {
  const {id}= useParams();
  //fethc post details
  const dispatch=useDispatch();

  useEffect(()=>{
  dispatch(fetchPostDetailsAction(id))
  },[id]);
const post=useSelector(state=>state?.post);
const{postDetails}=post;

//select updated post from store

const postupdated =useSelector(state=>state.post);
const {loading,appErr,serverErr,isUpdated,isDeleted}=postupdated;


  const formik = useFormik({
    enableReinitialize:true,
     initialValues:{
      title:'',
      description:'',
      // category:'',
     },
     onSubmit:(values)=>{
      const data={
        title:values?.title,
        description:values?.description,
        id:id
      }
      dispatch(updatePostAction(data));
     console.log(data);
     },
     validationSchema: formSchema,

  });

  if(isUpdated){
    return <Navigate to='/posts'/>
  }
  if(isDeleted){
    return <Navigate to='/posts'/>
  }
  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
            Are you sure you want to edit{" "}
            <span className="text-green-300">Title</span>
          </h2>
          {serverErr || appErr ? <Text color="error" size={15} >{serverErr}-😬{appErr}</Text> :null }
        </div>
       
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div >
          {postDetails?.image.split('.').pop()==='png' || postDetails?.image.split('.').pop()==='jpeg' || postDetails?.image.split('.').pop()==='jpg' ? <Card.Image src={postDetails?.image}></Card.Image>:<div  className='player-wrapper' >
        <ReactPlayer
       
          className='react-player'
          css={{
            pl:15,pt:0
          }}
         
           
           onEnded={()=>dispatch(fetchPostDetailsAction(post?.id))}
  
          controls={true} playsinline={true}
          url={postDetails?.image}
          width='100%'
          height='100%'
          alt={post?.image}
        />
      </div>} 

           


            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <div >
                  <Input
                    color="secondary"
                    id="title"
                    
                    type="title"
                    
                    bordered 
                    labelPlaceholder={postDetails?.title} 
                    onBlur={formik.handleBlur("title")}
                    value={formik.values?.title}
                    onChange={formik.handleChange("title")}
                  />
                </div>
                <Spacer x={10}/>
                <div className="text-red-500">
                  {formik.touched.title && formik.errors.title}
                </div>
              </div>


              <CategorySelector
                value={formik.values?.category?.categoryTitle}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                error={formik.errors.category}
                touched={formik.touched.category}
              />
              <div>
             
                <Textarea labelPlaceholder={postDetails?.description} status="secondary"
                  rows="5"
                  cols="100"
                  onBlur={formik.handleBlur("description")}
                  value={formik.values?.description}
                  onChange={formik.handleChange("description")}
                 
                  type="text"
                ></Textarea>
                <div className="text-red-500">
                  {formik.touched.description && formik.errors.description}
                </div>
              </div>

              <div className="w-full flex justify-center py-2 ">
                
                {loading?  <Button
                    disabled
                    color='secondary'
                  >
                                      <Loading type="points-opacity" color="currentColor" size="sm" />

                  </Button> :
                   <Button.Group size="xl" horizontal color="error" bordered>
                   <Button
                   type="submit"  size="xl" color='warning'
                  >
                  Update
                 </Button>
                 <Button 
                  size="xl"  onClick={()=>dispatch(deletePostAction(id))}
                >
                Delete
               </Button></Button.Group>}
                {/* <Button color="error" auto css={{mw:100}}
                   onClick={dispatch(deletePostAction({id}))}></Button> */}

              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
