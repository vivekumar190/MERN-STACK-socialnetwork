import React ,{useEffect}from "react";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { Link, Navigate } from "react-router-dom";
import { Grid, Card, Text,Button, Spacer,Popover, User, Row, Col,Image,Loading, Avatar} from "@nextui-org/react";
import { HeartIcon } from './icons/HeartIcon';
import { fetchPostDetailsAction, fetchPostsAction, toggleAdddisLikeToPost, toggleAddLikeToPost } from "../../redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";
import DateFormatter from "../../utils/DateFormatter";
import { fecthCategoriesAction } from "../../redux/slices/category/categorySlice";
import ReactPlayer from 'react-player/lazy'
import AddComment from "../Comments/Comment";

export default function PostsList() {

  const dispatch=useDispatch();
  useEffect(()=>{
  dispatch(fecthCategoriesAction());
  },[dispatch]);

  

  const post=useSelector(state=>state?.post);
  const {postLists,loading,appErr,serverErr,likes,dislikes}=post;
  const user=useSelector(state=>state?.users);
  const {userAuth}=user;
  const category=useSelector(state=>state?.category);
  const {categoryList,loading:catloading,appErr:catErr,serverErr:catserverErr}=category;
//fetch new comments

const comment=useSelector(state=>state?.comment);
const {CommentCreated,Commentdeleted}=comment;

 // fetch posts


 useEffect(()=>{
  dispatch(fetchPostsAction({category:''}));
  },[dispatch,likes,dislikes,CommentCreated,Commentdeleted]);




//fetch catgores
 


  //select post from store

 





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
    <div class=''>
      <section class='py-0 '>
        <div class="py-0 min-h-screen radius-for-skewed  ">
          <div class="container mx-auto px-4">
            <div class="mb-0 flex flex-wrap items-center">
              <div class="w-full lg:w-1/2">
               
                {/* <h2 class="text-4xl  lg:text-5xl font-bold font-heading">
                  Latest Post
                </h2> */}
              </div>
              <div class=" block text-right w-1/2">
                {/* View All */}
               
  
              </div>
            </div>
            <div class="flex flex-wrap -mx-3">
              <div class="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
             
              </div>
              <div class='flex-center' >
        {/* all the posts*/}
        
        <Grid.Container gap={1}>
        <Grid>
        <Button size='xl' onClick={()=>dispatch(fetchPostsAction({category:''}))} flat color="secondary" css={{h: "$24"}} auto>
        <Image css={{p:1 }} 
          src="https://cdn-icons-png.flaticon.com/512/4069/4069344.png"
          alt="Default Image"
          width={40}
          height={40}
        />
          All posts
        </Button>
        </Grid>
                    {catloading?   <Loading className="w-full flex justify-center py-2 " size="lg" css={{alignContent:"center" ,p:10}} color="secondary" textColor="secondary">
          Loading Categories
        </Loading>:catserverErr ||catErr ? <h1>{catserverErr}-{catErr}</h1>:
                    categoryList?.length<=0 ? <h1>No category found</h1> :categoryList?.map((category)=>(


         
                     
           <Grid>
           <Button size="xl" onClick={()=>dispatch(fetchPostsAction({category:category?.title}))} flat color="secondary" css={{h: "$24"}} auto>
           <Image css={{p:10 }} 
          src={category?.logo}
          alt="Default Image"
          width={50}
          height={50}
        />
           <Text color="secondary"
      size={20}
    >
    {category?.title}
    </Text>
           </Button>
            </Grid>                   
                    ))}
                    </Grid.Container>
   {appErr|| serverErr? <h1>{serverErr}{appErr}</h1>:postLists?.length<=0?<h1>no posts yet</h1>:postLists?.map((post)=>(
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
      }}>ADMIN</Text>:post?.user?.points }
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
  {post?.comments.length>0?  <Grid.Container >
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
            </div>
          </div>
        </div>
        <div >
          <div class="skew bg-green-500 skew-bottom mr-for-radius">
            <svg
              class="h-8 md:h-12 lg:h-10 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
            </svg>
          </div>
          <div class="skew   skew-bottom ml-for-radius">
            <svg
              class="h-8  md:h-12 lg:h-20 w-full "
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
