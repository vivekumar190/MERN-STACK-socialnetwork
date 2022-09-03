import React, { useEffect, useState } from 'react'

import { Grid, Card, Text,Button, Spacer,Popover, User, Row, Col,Image,Loading, Avatar} from "@nextui-org/react";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import Subscriptionfeed from './Subscriptionfeed';
import MessageWindow from './MessageWindow';
import { useDispatch, useSelector } from 'react-redux';
import { userFeedAction } from '../../redux/slices/users/usersSlices';
import { fetchPostDetailsAction, fetchPostsAction, toggleAdddisLikeToPost, toggleAddLikeToPost } from '../../redux/slices/posts/postSlices';
import { Link } from 'react-router-dom';
import { HeartIcon } from '../Posts/icons/HeartIcon';
import AddComment from '../Comments/Comment';
import ReactPlayer from 'react-player';
import DateFormatter from '../../utils/DateFormatter';
const HomePage = () => {
    const dispatch=useDispatch();

    const user=useSelector(state=>state?.users);
  const {userAuth,feed}=user;
  const post=useSelector(state=>state?.post);
  const {postLists,loading,appErr,serverErr,likes,dislikes}=post;
 
  const comment=useSelector(state=>state?.comment);
  const {CommentCreated,Commentdeleted}=comment;

    useEffect(()=>{
   dispatch(userFeedAction());
    },[dispatch,likes,dislikes,CommentCreated,Commentdeleted])
  
    useEffect(()=>{
      dispatch(fetchPostsAction({category:''}));
      },[dispatch,likes,dislikes,CommentCreated,Commentdeleted]);


      const [following, setFollowing] = React.useState(false);
      const MockItem = ({ text }) => {
        return (
          <Card css={{ h: "$24", $$cardColor: '$colors$primary' }}>
            <Card.Body>
              <Text h6 size={15} color="white" css={{ mt: 0 }}>
                {text}
              </Text>
            </Card.Body>
          </Card>
        );
      };



 
  return (
    <div class="flex justify-evenly  ">

   <Subscriptionfeed/>
    <div class='feedbox' >
    {appErr|| serverErr? <h1>{serverErr}{appErr}</h1>:feed?.length<=0?<h1>no posts yet</h1>:feed?.map((post)=>(
<div class="flex justify-evenly" key={post?.id} >
<Card css={{$$cardColor: '$colors$#16181A', mw: "550px" ,bw:0}} >
<Card.Header css={{
  pl:10,pb:0
}}>
<Grid.Container gap={0} alignContent="center">
<Grid>

  <Popover >
    <Popover.Trigger>
      <User
      bordered
      src={post?.user?.profilePhoto}
      name={post?.user?.isAdmin ? <Text css={{
        textGradient: "45deg, $yellow600 -20%, $red600 100%",
      }}>ADMIN</Text>:post?.user?.firstName +' '+ post?.user?.lastName }
       size="lg"
        as="button"
        description={<DateFormatter date={post?.createdAt}/> }
      />
      
    </Popover.Trigger>
   
    <Popover.Content css={{ px: '$4', py: '$2',bw:0 }}>
    <Grid.Container
className="user-twitter-card__container"
css={{
  color:'$primary',
  mw: "270px",
  borderRadius: "$lg",
  padding: "$sm",
}}
>
<Row justify="space-around" align="center">
  <Col span={8}>
    <User
      src={post?.user?.profilePhoto}
      name={<Link to={`/profile/${post?.user?._id}`}>{post?.user?.firstName +' '+ post?.user?.lastName}</Link>}
      description={post?.user?.isAdmin ? <Text css={{
        textGradient: "45deg, $yellow600 -20%, $red600 100%",
      }}>9Crowd</Text>:post?.user?.points }
      css={{ px: 0 }}
    />
  </Col>
  <Col span={4}>
    <Row>
      <Button
        auto
        rounded
        onClick={() => setFollowing(!following)}
        css={{
          maxHeight: "$space$12",
          fs: "$xs",
          fontWeight: "$semibold",
          borderColor: following ? "$foreground" : "$primary",
          color: following ? "$foreground" : "$white"
        }}
        color="primary"
        bordered={following}
      >
        {following ? "Unfollow" : "Follow"}
      </Button>
    </Row>
  </Col>
</Row>
<Grid.Container className="user-twitter-card__username-container">
  <Grid xs={10}>
    <Text
      className="user-twitter-card__text"
      size={10}
      css={{ mt: "$1" }}
      color="#888888"
    >
      {post?.user?.points>=20? <h1>Silver</h1>:<h1>Newbie</h1>} 🎉
    </Text>
  </Grid>
</Grid.Container>

<Grid.Container
  className="user-twitter-card__metrics-container"
  justify="flex-start"
  alignContent="center"
>
  <Text className="user-twitter-card__text" size={14} color="#888888">
<Text
       b
            color="foreground"
            className="user-twitter-card__text"
            size={14}
            css={{pr:3}}
    >
   {post?.user?.following?.length}
    </Text>
     Following
  </Text>
  <Spacer inline x={0.5} />
  <Text className="user-twitter-card__text" size={14} color="#888888">
<Text
    b
    color="foreground"
    className="user-twitter-card__text"
    size={14}
    css={{pr:3}}
    >
   {post?.user?.followers?.length}
    </Text>
     Followers
  </Text>
</Grid.Container>
</Grid.Container>
    </Popover.Content>
  </Popover>
  
</Grid>
{post?.society?.handle ? <Link to={`/societies/${post?.society?._id}`}><Text size={17}  color='secondary'b>•{post?.society?.handle}</Text></Link>:null}
</Grid.Container>

<Text
        h1
        size={15}
        css={{
          textGradient: "45deg, $purple600 -20%, $pink600 100%",
        }}
        weight="bold"
      >
        {post?.category}
      </Text>
      
    
{post?.user?._id===userAuth?._id ? <Link    to={`/update-post/${post?.id}`}>

          <Image src="https://cdn-icons.flaticon.com/png/512/4620/premium/4620789.png?token=exp=1659818371~hmac=560eddca31daa8cfe3c27a7c683b6730"
                  alt="Default Image"
                  width={20}
                  height={20}/>
          </Link> :null}
</Card.Header>
<Card.Body css={{p:0 }}>


    {post?.image.split('.').pop()==='png' || post?.image.split('.').pop()==='jpeg' || post?.image.split('.').pop()==='jpg' || post?.image.split('.').pop()==='PNG' || post?.image.split('.').pop()==='JPEG' || post?.image.split('.').pop()==='JPG' ? <Card.Image src={post?.image}></Card.Image>:<div  className='player-wrapper' >
        <ReactPlayer
          className='react-player'
          css={{
            pl:15,pt:0
          }}
          
           onPlay={()=>dispatch(fetchPostDetailsAction(post?.id))}
  
          controls={true} playsinline={true}
          url={post?.image}
          width='100%'
          height='100%'
          alt={post?.image}
        />
      </div>} 

      
      <Text
      b
      size={20}
      color='secondary' 
      css={{
        pl:15,pt:0
      }}
      
    >
    {post?.title}
    </Text>
  
  <Text 
  color='warning' 
  size={15}
css={{
  pl:15,pt:0
}}
>
{post?.description}
  </Text>
  <Spacer x={8}/>
  {post?.comments?.length>0?  <Grid.Container >
  <Grid>
    <User size='xs' src={post?.comments[0]?.user?.profilePhoto} name={post?.comments[0]?.user?.firstName +'-commented: '+ post?.comments[0]?.description}></User>
    </Grid>
    <AddComment post={post}/>
  </Grid.Container>:<Text color="error">No Comments Yet <AddComment post={post}/></Text>}
 

 
 

</Card.Body>
{/* <Card.Divider /> */}
<Card.Footer>
{post?.likes?.includes(userAuth?._id)?<HeartIcon onClick={()=>dispatch(toggleAddLikeToPost(post?._id))} fill="red" filled/>:

<HeartIcon onClick={()=>dispatch(toggleAddLikeToPost(post?._id))} fill="red"/>
}
<Text
  h1
  size={15}
  css={{p:5,
    textGradient: "45deg, $yellow600 -20%, $red600 100%",
  }}

>{post?.likes?.length}</Text>

<Spacer y={1}/>
 
   
    {post?.dislikes?.includes(userAuth?._id)? <ThumbDownIcon onClick={()=>dispatch(toggleAdddisLikeToPost(post?._id))} className="h-5 w-5 cursor-pointer text-gray-800" />:

<ThumbDownIcon  onClick={()=>dispatch(toggleAdddisLikeToPost(post?._id))} className="h-5 w-5 cursor-pointer" />
}



    <Text
  h1
  size={15}
  css={{ p:5,
    textGradient: "45deg, $yellow600 -20%, $red600 100%",
  }}
 
>{post?.dislikes?.length ? post?.dislikes?.length:''}</Text>
  

<Spacer y={1}/>
 
  
  <EyeIcon className="h-5 w-5  text-blue-800" />
  
  <Text
  h1
  size={15}
  css={{ p:5,
    textGradient: "45deg, $yellow600 -20%, $red600 100%",
  }}
 
>{post?.numViews}</Text>


</Card.Footer>

</Card>
<Spacer inline x={0.5} />
</div>
   ))}
    </div>
    <div class='bg-grey-900'>

    </div>
  <MessageWindow/>
  </div>
  )
}

export default HomePage