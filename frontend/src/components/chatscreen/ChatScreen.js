import React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { baseUrl } from "../../utils/baseUrl";
import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";
import {
  Input,
  Button,
  Card,
  Text,
  Container,
  Grid,
  Spacer,
  Loading,
} from "@nextui-org/react";
const newSocket = io("http://localhost:5000");
//form schema
const formSchema = Yup.object({
  title: Yup.string().required("message is required"),
});
const ChatScreen = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState([]);
  const [chatmessage, setchatMessage] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      //   setMessage([...message, values.title]);
      console.log(chatmessage);
      newSocket.emit("chatMessage", values.title);
    },
    validationSchema: formSchema,
  });
  useEffect(() => {
    newSocket.on(
      "message",
      (messages) => setMessage([...message, messages])
      //   console.log(messages)
    );
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      <header className="app-header">React Chat</header>
      {socket ? (
        <div className="chat-container">
          <form onSubmit={formik.handleSubmit} class="dropzone">
            {message}
            <Text
              size={30}
              css={{
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
              }}
            >
              {message?.map((mes) => (
                <div>{mes}</div>
              ))}
            </Text>
            <div>
              <Input
                value={formik.values.title}
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                type="title"
                color="primary"
                placeholder="Enter a category name"
                label="title"
              />
            </div>
            <div>{formik.touched.message && formik.errors.message}</div>
            <Spacer y={1} />
            <Button type="submit" size="xl" color="secondary">
              Send
            </Button>
          </form>
          {message}
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
};

export default ChatScreen;
