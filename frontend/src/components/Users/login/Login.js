import React from 'react'
import { Input,Button, Card,Text,Container,Grid,Spacer,Loading} from "@nextui-org/react";
import { useFormik } from "formik";
import{Navigate} from 'react-router-dom';
import * as Yup from "yup";
import { loginUserAction } from '../../../redux/slices/users/usersSlices';
import {useDispatch,useSelector} from 'react-redux';
const formSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

const Login = () => {


const dispatch=useDispatch();
    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        onSubmit: values => {
          //dispath the action
        dispatch(loginUserAction(values));
        },
        validationSchema: formSchema,
      });
      //cutom background
      const myStyle={
        backgroundImage: 
 "url('https://vmspace.com/ActiveFile/spacem.org/news/thum/A.%20%C0%CC%BE%C8%20%C3%C3_%BB%E7%C0%FD%20%BD%C5%B5%E9%C0%C7%20%C7%B0%BE%C8%BF%A1%20%B0%C5%C7%CF%B4%D9_2015_Image%20courtesy%20of%20Leeum%20Museum%20of%20Art.jpg')",
 height: '1100px',
 fontSize:'50px',
}
//REDIRECT to home page
const store=useSelector((state)=>state?.users);
const {userAuth,loading,serverErr,appErr}=store;
if(userAuth){
  return <Navigate to={`/profile/${userAuth?._id}`}/>
} 
  return (<div style={myStyle} >
    <Container responsive AlignItems = 'center'>
    
<Grid.Container gap={5}>
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
              <Spacer y={1} />
            {serverErr || appErr ? <Text color="error" size={15} >{serverErr}-😬{appErr}</Text> :null }
             
              <form onSubmit={formik.handleSubmit}>
                
                  {/* Header */}
                  <Text size={30} css={{
        textGradient: "45deg, $yellow600 -20%, $red600 100%",
      }}  >Login to your Account</Text>
                  
               
                <div>
                  <span>
                  
                  </span>
                  {/* Email */}
                  <Input
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    
                    type="email"
                    color="primary"
                    placeholder="enter email"
                    label="Email"
            
                  />
                </div>
                {/* Err message */}
                <div >
                  {formik.touched.email && formik.errors.email}
                </div>
                <div >
                  <span >
             
                  </span>
                  {/* Password */}
                  <Input
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                   
                    type="password"
                    color="primary"
                    placeholder="Enter Password"
                    
                    label="Password"
                  />
                </div>
                {/* Err msg */}
                <div >
                  {formik.touched.password && formik.errors.password}
                </div>
                {/* Login btn */}
                <Spacer y={1} />
                {loading ? ( <Button
                  disabled  size="xl" color='eRROR'
                 
                 >
                   <Loading type="points-opacity" color="currentColor" size="sm" />
                </Button>):(  <Button
                  type="submit"  size="xl" color="secondary"
                  
                
                 >
                  Login
                </Button>) }
              
              </form>
            </div>
          </div>
          <div >
            <span >
            
            </span>
           
            
               <Spacer y={1} />
            
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

export default Login