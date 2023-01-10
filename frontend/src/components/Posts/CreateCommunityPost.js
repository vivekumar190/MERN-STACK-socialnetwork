import React, { useEffect } from "react";
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { Navigate, useParams } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Input,
  Textarea,
  Loading,
  Text,
  Spacer,
  Progress,
} from "@nextui-org/react";
import styled from "styled-components";
import * as Yup from "yup";
import { createPostAction } from "../../redux/slices/posts/postSlices";
import CategorySelector from "../categorySelector/CategorySelector";
import { fecthCategoriesAction } from "../../redux/slices/category/categorySlice";

//form schema
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("description is required"),
  category: Yup.object().required("category is required"),
  image: Yup.string().required("category is required"),
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

export default function CreateCommunityPost(props) {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();

  //select store data
  const post = useSelector((state) => state?.post);
  const { isCreated, loading, appErr, serverErr } = post;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      image: "",
    },
    onSubmit: (values) => {
      const data = {
        category: values?.category?.label,
        title: values?.title,
        description: values.description,
        image: values?.image,
        society: id,
      };
      //dispath the action
      dispatch(createPostAction(data));
      console.log(values);
    },
    validationSchema: formSchema,
  });

  if (isCreated) {
    return <Navigate to="/posts" />;
  }

  return (
    <>
      <div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {loading ? (
            <Progress
              indeterminated
              value={50}
              color="secondary"
              status="secondary"
            />
          ) : null}

          <Text
            className=" text-center"
            h1
            size={60}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
            weight="bold"
          >
            Create a Society Post
          </Text>

          <p className="mt-2 text-center ">
            <Text color="warning" size={20}>
              Share your ideas to the word. Your post must be free from
              profanity
            </Text>

            {serverErr || appErr ? (
              <Text color="error" size={15}>
                {serverErr}-😬{appErr}
              </Text>
            ) : null}
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className=" py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <div className="mt-1">
                  {/* Title */}
                  <Input
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="title"
                    bordered
                    labelPlaceholder="Title"
                    color="primary"
                  />
                </div>
                {/* Err msg */}
                <div className="text-red-500">
                  {formik.touched.title &&
                    formik.errors.title &&
                    formik.touched.errors?.title}
                </div>
              </div>

              {props.error?.touched && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {props.error}
                </div>
              )}
              <Spacer x={20} />

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
                {/* image upload*/}
                <Spacer x={5} />
                <CategorySelector
                  value={formik.values.category?.label}
                  onChange={formik.setFieldValue}
                  onBlur={formik.setFieldTouched}
                  error={formik.errors.category}
                  touched={formik.touched.category}
                />
                <Spacer x={5} />
                <Container
                  className="container bg-gray-700 rounded"
                  css={{
                    flex: "1",
                    display: "flex",

                    padding: "20px",

                    color: "#bdbdbd",

                    transition: "border 0.24s ease-in-out",
                  }}
                >
                  <Spacer x={5} />

                  <Dropzone
                    onBlur={formik.handleBlur("image")}
                    accept="image/*,video/mp4"
                    error={formik.errors.image}
                    onDrop={(acceptedFiles) => {
                      formik.setFieldValue("image", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="container">
                        <div
                          {...getRootProps({
                            className: "dropzone",
                            onDrop: (event) => event.stopPropagation(),
                          })}
                        >
                          <input {...getInputProps()} />
                          <p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
                            <Text color="success">
                              {" "}
                              select image or a video
                            </Text>
                          </p>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </Container>
                {/* Err msg */}
              </div>
              <div>
                {/* Submit btn */}
                {loading ? (
                  <Button disabled color="secondary">
                    <Loading
                      type="points-opacity"
                      color="currentColor"
                      size="sm"
                    />
                  </Button>
                ) : (
                  <Button type="submit" color="secondary">
                    Create Post
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
