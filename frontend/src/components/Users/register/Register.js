import React from 'react'
import { Input, Modal,Button, Card,Text,Row,Container, Grid,Spacer,Loading } from "@nextui-org/react";
import {useFormik} from'formik';
import * as Yup from 'yup';
import{Navigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { registerUserAction } from '../../../redux/slices/users/usersSlices';

// Form Schema 
const formSchema=Yup.object({
  firstName:Yup.string().required('Firstname Required'),
  lastName:Yup.string().required('LastName Required'),
  email:Yup.string().required('email Required'),
  password:Yup.string().required('Password is definetly Required'),

}) ;
//component   for register

const Register = () => {
 // dispatch

 const dispatch =useDispatch();


 //--------formik
 const formik=useFormik({
  initialValues:{
    firstName:'',
    lastName:'',
    email:'',
    password:''
  },
  onSubmit:(values)=>{
    console.log({values});
    // dispatch
    dispatch(registerUserAction(values));
  },
  validationSchema:formSchema
 });

 


  //-----------------------
    const myStyle={
        backgroundImage: 
 "url('https://vmspace.com/ActiveFile/spacem.org/news/thum/A.%20%C0%CC%BE%C8%20%C3%C3_%BB%E7%C0%FD%20%BD%C5%B5%E9%C0%C7%20%C7%B0%BE%C8%BF%A1%20%B0%C5%C7%CF%B4%D9_2015_Image%20courtesy%20of%20Leeum%20Museum%20of%20Art.jpg')",
 height: '1100px',
 fontSize:'50px',
}

    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
      setVisible(false);
      
    };
 
//select state from stroe

const storeData=useSelector(state => state?.users);
const {loading,appErr,serverErr,registered}=storeData;

  console.log(appErr);

if(registered){
  return <Navigate to='/login'/>
}





 return (
    
    <div style={myStyle} >
   
    <Container responsive gap={0} AlignItems = 'center' css={{ mw: "1000px" }}
 >
  
         
        
    <Grid.Container gap={20} >
    <Grid sm={12} md={12}>
   
      <Card css={{ mw: "1000px" }}>
        <Card.Header>
          <Text h1
      css={{
        textGradient: "45deg, $blue600 -20%, $pink600 50%",
      }}>User Policy</Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ py: "$10" }}>
          <Text css={{
        textGradient: "45deg, $yellow600 -20%, $red600 100%",
      }}>
          A user account policy is a document which outlines the requirements for requesting and maintaining an account on computer systems or networks, typically within an organization. It is very important for large sites where users typically have accounts on many systems.
          </Text>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Row justify="flex-end">
          <Button size="sm" light onClick={console.log('as')}>
                deny
              </Button>
            <Button color="secondary" shadow onClick={handler}>
     Agree and Register
      </Button>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  </Grid.Container>
  
  <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler} 
        css={{m:10}}
      >
        <Modal.Header>
          <Text id="modal-title" size={30} css={{
        textGradient: "45deg, $blue600 -20%, $pink600 50%"}}>
            Welcome To  Bafle
        
          </Text>
        </Modal.Header>
        <Modal.Body>
        <Grid.Container gap={1}>
        <Spacer x={3} />  
                <section >
      <div >
        <div >
          <div >
            <div >
              <div >
                <span >
                <Text h5 css={{
        textGradient: "45deg, $yellow600 -20%, $red600 100%",
      }}>
                  Create a Account</Text>
                  <Spacer x={2} /> 
                </span>
              </div>
            </div>
            <div >
              <div >
                <form onSubmit={formik.handleSubmit}>
                 
                  {/* First name */}
                  <div >
                    <span >
                   
                    </span>
                    <Input
                      value={formik.values.firstName}
                      onChange={formik.handleChange("firstName")}
                      onBlur={formik.handleBlur("firstName")}
                      color="secondary"
                      label="First Name"
        placeholder="Enter first name"
                      type="firstName"
                     
                    />
                  </div>
                  {/* Err msg*/}
                  
                  <div >
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                  {/* Last name */}
                  <div >
                  
                    <Input
                      value={formik.values.lastName}
                      onChange={formik.handleChange("lastName")}
                      onBlur={formik.handleBlur("lastName")}
                      
                      color="secondary"
                      type="lastName"
                      label="Last Name"
          placeholder="Enter last name"
                    />
                  </div>
                  {/* Err msg*/}
                  <div >
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                  {/* Email */}
                  <div >
                    <span >
                    
                    </span>
                    <Input
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      
                      color="primary"
                      type="email"
                      label='Email'
                      placeholder="example@gmail.com"
                    />
                  </div>
                  {/* Err msg*/}
                  <div >
                    {formik.touched.email && formik.errors.email}
                  </div>
                  <div >
                    <span >
                     
                    </span>
                    <Input
                      value={formik.values.password}
                      onChange={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")}
                      color="primary"
                     
                      type="password"
                      label='Password'
                      placeholder="Enter Password"
                    />
                  </div>
                  {/* Err msg*/}
                  <div >
                    {formik.touched.password && formik.errors.password}
                  </div>

                  <div ></div>
                  <Spacer y={1} /> 
                  

                  {loading ? ( <Button
                   disabled
                  >
                 <Loading type="points-opacity" color="currentColor" size="sm" />
                  </Button> ):(
                      <Button
                    type="submit"
                  >
                    Register
                  </Button>

                  )}
                  
            
                  <Spacer y={1} /> 
                  <Button flat xl color="error" onClick={closeHandler}>
            Close
          </Button>
         
        
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
        {/* <Grid>
        <Input value={formik.values.email}
        onChange={formik.handleChange('email')}
        onBlur={formik.handleBlur('email')}
          {...bindings}
          clearable
          shadow={false}
          onClearClick={reset}
          status={helper.color}
          color={helper.color}
          helperText={formik.touched.email && formik.errors.email}
          helperColor={helper.color}
        
          type="email"
          label="Email"
          placeholder="With regex validation"
        />
      </Grid>
      <Grid>
        <Input value={formik.values.firstName}
        onChange={formik.handleChange('firstName')}
        onBlur={formik.handleBlur('firstName')}
        clearable
        color="secondary"
        helperText={formik.touched.firstName && formik.errors.firstName}Err
        label="First Name"
        placeholder="Enter first name"
        />

      </Grid>
      <Grid>
        <Input value={formik.values.lastName}
        onChange={formik.handleChange('lastName')}
        onBlur={formik.handleBlur('lastName')}
          clearable
          color="secondary"
          helperText={formik.touched.lastName && formik.errors.lastName}Err
          label="Last Name"
          placeholder="Enter last name"
        />
      </Grid>
      <Grid>
        <Input value={formik.values.password}
          onChange={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          clearable
          color="warning"
          helperText={formik.touched.password && formik.errors.password}Err
          type="password"
          label="Password"
          placeholder="Enter your password"
        />
      </Grid>
      */}
    </Grid.Container>
    </Modal.Body>
        {/* <Modal.Footer>
          <Button flat xl color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button auto type='submit' onClick={closeHandler}>
         
          </Button>
          <button type='submit'>Submit</button>
        </Modal.Footer> */}
         {appErr|| serverErr?   <Text  color="error">{serverErr}-{appErr}</Text>:null}
      </Modal>
      
      
  </Container>
   
  </div>
  );
      
}

export default Register