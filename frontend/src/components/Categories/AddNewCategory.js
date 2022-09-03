import React from 'react'
import { Input,Button, Card,Text,Container,Grid,Spacer,Loading} from "@nextui-org/react";
import{useDispatch, useSelector} from 'react-redux';
import { createCategoryAction } from '../../redux/slices/category/categorySlice';
import { useFormik } from "formik";
import {Navigate} from 'react-router-dom';
import * as Yup from "yup";

//form schema
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  logo: Yup.string().required("Title is required"),
});



const AddNewCategory = () => {

  const dispatch=useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
      logo:''
      
    },
    onSubmit: values => {
      //dispath the action
    dispatch(createCategoryAction(values));
  
    },
    validationSchema: formSchema,
  });

const myStyle={
  backgroundImage: 
 "url('https://vmspace.com/ActiveFile/spacem.org/news/thum/A.%20%C0%CC%BE%C8%20%C3%C3_%BB%E7%C0%FD%20%BD%C5%B5%E9%C0%C7%20%C7%B0%BE%C8%BF%A1%20%B0%C5%C7%CF%B4%D9_2015_Image%20courtesy%20of%20Leeum%20Museum%20of%20Art.jpg')",
 height: '1000px',
 fontSize:'20px',
}

//get datat from store

const state=useSelector(state=>state?.category);

const {loading,appErr,serverErr,isCreated} = state;

if(isCreated) return <Navigate to='/category-list'/>



  return (<div style={myStyle} >
    <Container responsive AlignItems = 'center'>
    
    <Grid.Container gap={0}>
    <Spacer y={5} />
          <Grid sm={12} md={12} >
        
    <Card  isHoverable variant="bordered" css={{ mw: "400px" }}>
     
          <Card.Body css={{ py: "$5" }}>
          <Spacer y={2} /> 
          <section >
          <Spacer x={2} /> 
        <div >
          <div >
            <div >
              <div >
                <div >
                  {/* Form */}
                 
                  <form onSubmit={formik.handleSubmit} class="dropzone">
                  {serverErr || appErr ? <Text color="error" size={15} >{serverErr}-😬{appErr}</Text> :null }
                      {/* Header */}
                      <Text size={30} css={{
            textGradient: "45deg, $yellow600 -20%, $red600 100%",
          }}  >Create new Category</Text>
                      
                   
                    <div>
                      <span>
                      
                      </span>
                      {/* Email */}
                      <Input
                        value={formik.values.title}
                        onChange={formik.handleChange("title")}
                        onBlur={formik.handleBlur("title")}
                        type="title"
                        color="primary"
                        placeholder="Enter a category name"
                        label="Title"
                
                      />
                    </div>
                    {/* Err message */}
                    <div >
                      {formik.touched.title && formik.errors.title}
                    </div>
                    <div  >
                      <span >
                 
                      </span>
                      {/* Password */}
                      <Input 
                        
                        value={formik.values.logo}
                        onChange={formik.handleChange("logo")}
                        onBlur={formik.handleBlur("logo")}
                        type="logo"
                        color="primary"
                        placeholder="logo"
                        label="logo Url"
                      />
                    </div>
                    {/* Err msg */}
                    {/* <div >
                      {formik.touched.password && formik.errors.password}
                    </div> */}
                    {/* Login btn */}
                    <Spacer y={1} />
                    {loading?  <Button
                      type="submit"  size="xl" color="secondary"
                     >
                    <Loading type="points-opacity" color="currentColor" size="sm" />
                    </Button>:
                     <Button
                     type="submit"  size="xl" color="secondary"
                    >
                     Add-Category
                   </Button>}
                  
                  
                  </form>
                </div>
              </div>
              <div >
                <span >
                
                </span>
                {/* <Spacer y={1} />
                {serverErr || appErr ? <Text color="error" size={15} >{serverErr}-😬{appErr}</Text> :null }
                
                   <Spacer y={1} /> */}
                
              </div>
            </div>
          </div>
        </div>
      </section>
          </Card.Body>
        </Card>
    
     
      </Grid>
        </Grid.Container>
        
        </Container>
        </div>
  )

}

export default AddNewCategory