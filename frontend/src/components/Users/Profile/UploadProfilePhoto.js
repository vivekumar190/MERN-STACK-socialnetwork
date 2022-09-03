import { UploadIcon } from "@heroicons/react/outline";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { userProfileUploadAction } from "../../../redux/slices/users/usersSlices";
import { useDispatch, useSelector } from "react-redux";
//Css for dropzone
import {Navigate} from 'react-router-dom';
import { Button, Loading, Text } from "@nextui-org/react";
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const formSchema = Yup.object({
  image: Yup.string().required("Image is required"),
});

export default function UploadProfilePhoto() {
  const dispatch=useDispatch();

  //formik

  const formik = useFormik({
    initialValues: {
      image: "",
    },
    onSubmit: values => {
      
      dispatch(userProfileUploadAction(values));
      console.log(values);
    },
    validationSchema: formSchema,
  });

  //store data
  const users=useSelector(state=>state?.users);
  const {profilePhoto,loading,appErr,serverErr,isUploaded}=users;

  if(isUploaded){
    return <Navigate to={`/profile/${users?.userAuth?._id}`}/>
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
          Upload profile photo
        </h2>
        {/* Displya err here */}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            {/* Image container here thus Dropzone */}
            {serverErr || appErr ? <Text color="error" size={15} >{serverErr}-😬{appErr}</Text> :null }
            <Container className="">
              <Dropzone
                onBlur={formik.handleBlur("image")}
                accept="image/jpeg, image/png"
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
                        Click here to select image
                      </p>
                    </div>
                  </div>
                )}
              </Dropzone>
            </Container>

            <div className="text-red-500">
              {formik.touched.image && formik.errors.image}
            </div>
            <p className="text-sm text-gray-500">
              PNG, JPG, GIF minimum size 400kb uploaded only 1 image
            </p>

            <div>

            {loading?  <Button
                      type="submit"  size="xl" color="secondary"
                     >
                    <Loading type="points-opacity" color="currentColor" size="sm" />
                    </Button>:
                     <Button
                     type="submit"  size="xl" color="secondary"
                    >
                     Upload -photo
                   </Button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
