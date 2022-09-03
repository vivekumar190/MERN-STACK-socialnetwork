import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SendButton } from "./SendButton";
import { SendIcon } from "./SendIcon";
import { Grid, Input, Loading , User,Modal,useModal,Card,Image,Button,Divider, Text, Avatar } from '@nextui-org/react';
import { Navigate, useParams ,Link} from "react-router-dom";
import { createCommentAction, deleteCommentAction } from "../../redux/slices/comments/commentSlices";
import { useDispatch, useSelector } from "react-redux";
import DateFormatter from "../../utils/DateFormatter";
import Moment from "react-moment";


//Form schema
const formSchema = Yup.object({
  description: Yup.string().required("Description is required"),
});

const AddComment = (props) => {
 const {comments}=props?.post;
 console.log(comments);
 const dispatch=useDispatch();

  const {id}=props.post;
  console.log(id);
  const user=useSelector(state=>state?.users);
  const {userAuth}=user;
 




  const formik = useFormik({
    initialValues: {
      description: "",
    },
    onSubmit: values => {
      const data = {
        postId:id,
        description: values?.description,
        
      };
      dispatch(createCommentAction(data));
      console.log(data);
    },
    validationSchema: formSchema,
  });
  const { setVisible, bindings } = useModal();
  return (
    
    <div className="flex flex-col ">
{/* comment modal */}

<div>{comments.length<=0? <Button auto flat color="secondary" size='xs' css={{ px: "$5" }} onClick={() => setVisible(true)}>
      Create comment
      </Button>: <Button auto flat color="secondary" size='xs' css={{ px: "$5" }} onClick={() => setVisible(true)}>
      All  Comments
      </Button>}
     
      <Modal
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
           {comments.length<=0?<Text bold>No comments Yet</Text>:comments.length==1? <Text bold>{comments.length} Comment</Text>:<Text bold>Comments {comments.length} </Text>} 
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div id="modal-description">
          {comments.map((comment) =>(

<Card css={{$$cardColor: '$colors$#16181A', mw: "500px" ,bw:0}}>
<Card.Header>
  <Avatar
    
    zoomed
    color="secondary"
    alt="nextui logo"
    src={comment?.user?.profilePhoto}
    css={{p:2}}
    width={30}
    height={30}
  />
  <Grid.Container css={{ pl: "$2" }}>
    <Grid xs={12}>
      <Text color="secondary" bold >
      {comment.user.firstName +' ' +comment.user.lastName}
      </Text>
    </Grid>
    <Grid xs={12}>
      <Text size={13} ><Moment fromNow >{comment?.createdAt}</Moment></Text>
    </Grid>
  </Grid.Container>

  {comment?.user?._id===userAuth?._id ?
  
          <Image 
          onClick={()=>dispatch(deleteCommentAction(comment?._id))}          
          src="https://cdn-icons-png.flaticon.com/512/5376/5376772.png"
                  alt="Default Image"
                  width={20}
                  height={20}/>
          :null}
</Card.Header>
<Card.Body css={{ py: "$0" }}>
  <Text>
   {comment.description}
  </Text>
</Card.Body>
<Card.Footer>

  <Divider />
</Card.Footer>
</Card>
          ))}
    </div>
        </Modal.Body>
        <Modal.Footer>
        <form
        onSubmit={formik.handleSubmit}
        className="mt-1 flex max-w-sm m-auto"
      >
        {userAuth?  <Input      


onBlur={formik.handleBlur("description")}
value={formik.values.description}
onChange={formik.handleChange("description")}
type="text"
name="text"
id="text"
  clearable
  contentRightStyling={false}
  placeholder="Type your Comment..."
  contentRight={
    <SendButton  type="submit">
      <SendIcon />
    </SendButton>
  }
/>:<Link to='/login'><Text align='center' color='gradient'>Login to add comment</Text></Link>}
          
          
          
        
        {/* <input
          onBlur={formik.handleBlur("description")}
          value={formik.values.description}
          onChange={formik.handleChange("description")}
          type="text"
          name="text"
          id="text"
          className="shadow-sm focus:ring-indigo-500  mr-2 focus:border-indigo-500 block w-full p-2 border-1 sm:text-sm border-gray-300 rounded-md"
          placeholder="Add New comment"
        /> */}

        {/* <button
          type="submit"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button> */}
      </form>
          <Button auto flat color="error" size='sm' onClick={() => setVisible(false)}>
            Close
          </Button>
          {formik.touched.description && formik.errors.description}
        </Modal.Footer>
      </Modal>
    </div>
      <div className="text-red-400 mb-2 mt-2">   
      </div>
    </div>
  );
};

export default AddComment;
