import React ,{useEffect}from 'react'
import { Card, Grid, Text,Avatar, Image, Button ,Modal, useModal,Table, Row, Col, Tooltip, Spacer, User, Divider,Popover} from "@nextui-org/react";
import {  ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { fetchsinglesocietyAction, joinsocietyAction, KickfromsocietyAction, PromotetomembersocietyAction, PromotetotresurersocietyAction, PromotetovicepresidentsocietyAction } from '../../redux/slices/Societies/SocietySlices';
import { fetchPostDetailsAction, fetchPostsAction, toggleAdddisLikeToPost, toggleAddLikeToPost } from "../../redux/slices/posts/postSlices";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams ,Link} from 'react-router-dom';
import { HeartIcon } from './icons/HeartIcon';
import DateFormatter from "../../utils/DateFormatter";
import ReactPlayer from 'react-player/lazy'
import AddComment from "../Comments/Comment";
import { StyledBadge } from './icons/StyledBadge';
import { userFollowAction, userUnFollowAction } from '../../redux/slices/users/usersSlices';



const SingleSociety = () => {
    // constructing the table
  



    const dispatch=useDispatch();
    const user=useSelector(state=>state?.users);
    const {userAuth,follow,unfollow}=user;
    const {id}=useParams();
    const soc=useSelector(state=>state?.society);
    const {societydetails,loading,appErr,serverErr,joinRequested,promotedtomember,tresurer,vicepresident,kicked}=soc; 
    const society=societydetails;
    const awaited=society?.awaitedmembers.find(element=>element._id==userAuth._id);

    useEffect(()=>{
      dispatch(fetchsinglesocietyAction(id));
      },[dispatch,joinRequested,promotedtomember,follow,unfollow,tresurer,vicepresident,kicked]);

    const post=useSelector(state=>state?.post);
    const {postLists,likes,dislikes}=post;
    // ftehc user
   




    //fetch comment
    const comment=useSelector(state=>state?.comment);
const {CommentCreated,Commentdeleted}=comment;

//
// fethc posts from this society
    const { setVisible, bindings } = useModal();
    useEffect(()=>{
        dispatch(fetchPostsAction({society:societydetails?.id}));
        },[dispatch,societydetails,likes,dislikes,CommentCreated,Commentdeleted]);

   // select data from store     
       

      const [following, setFollowing] = React.useState(false);

const isPresident=society?.president?._id===userAuth?._id;
const isVicePresident=society?.vicepresident?._id===userAuth?._id;
const isTresurer=society?.treasurer?._id===userAuth?._id;
const isMember=society?.members.find(a => a._id===userAuth?._id);

console.log(isMember)

// render the members into the tabel

const renderCell = (tableuser, columnKey) => {

 
    const cellValue = tableuser[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User squared src={tableuser?.profilePhoto} name={tableuser?.firstName +' '+ tableuser.lastName} css={{ p: 0 }}>
            {tableuser?.email}
          </User>
        );
      case "role":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
                <Col css={{p:0}}><Image src='https://cdn-icons-png.flaticon.com/512/4820/4820206.png' width={20} height={20} css={{p:0}}></Image></Col>
              <Col css={{p:0}}> <Text b align='center'size={13} css={{ tt: "capitalize", color: "$accents7" }}>
              {tableuser?.points}
              </Text></Col>
             
            </Row>
          </Col>
        );
      case "status":
        return <StyledBadge type={tableuser?.isAccountVerified?'active':'paused'}>{tableuser?.isAccountVerified ?'Verified ': 'Unverified'}</StyledBadge>;

      case "actions":
        return (
          <Row justify="center" align="center">
 {society?.awaitedmembers?.find(element=>element._id==tableuser._id) && (isTresurer || isPresident || isVicePresident) ?  
 <>
 <Col css={{ d: "flex" }}>
<Tooltip
  content="Delete user"
  color="error"
  onClick={() => console.log("Delete user")}
>
   <Button  auto flat color='warning' onClick={() => dispatch(PromotetomembersocietyAction({memberId:tableuser?._id,societyId:society?._id}))}>
  <Image src='https://cdn-icons-png.flaticon.com/512/7764/7764692.png' width={25} height={25}></Image>
  </Button>
</Tooltip>
</Col>
 
<Col css={{ d: "flex" }}>
             
             <Tooltip content="Promote to member">
             <Button
              auto
              flat rounded
             color='error'
            >   
              <Image 
           alt="Default Image"
           width={25}
           height={25}
           src='https://cdn-icons-png.flaticon.com/512/8010/8010315.png'></Image>
             Message
            </Button>
             </Tooltip>
           </Col>






</>
: society?.members?.find(element=>element?._id==tableuser?._id) && (isTresurer || isPresident || isVicePresident) ?



<>
<Col css={{ d: "flex" }}>
<Tooltip
  content=""
  color="error"
  onClick={() => console.log("Delete user")}
>
   <Button  auto flat color='warning' onClick={()=>dispatch(PromotetovicepresidentsocietyAction({memberId:tableuser?._id,societyId:society?._id}))}>
  <Image src='https://cdn-icons-png.flaticon.com/512/4593/4593926.png' width={25} height={25}></Image>
  </Button>
</Tooltip>
</Col>








           <Col css={{ d: "flex" }}>
<Tooltip
  content=""
  color="error"
  
>
   <Button  auto flat color='warning' onClick={() => dispatch(PromotetotresurersocietyAction({memberId:tableuser?._id,societyId:society?._id}))}>tresurer
  <Image src='https://cdn-icons-png.flaticon.com/512/5031/5031251.png' width={25} height={25}></Image>
  </Button>
</Tooltip>
</Col>
           <Col css={{ d: "flex" }}>
             
             <Tooltip content="Promote to member">
             <Button
              auto
              flat rounded
             color='error'
            >   
              <Image 
           alt="Default Image"
           width={25}
           height={25}
           src='https://cdn-icons-png.flaticon.com/512/8010/8010315.png'></Image>
             Message
            </Button>
             </Tooltip>
           </Col>
           <Col css={{ d: "flex" }}>
             
             <Tooltip content="KiCK OUT">
               <Button  auto flat color='secondary' onClick={() => dispatch(KickfromsocietyAction({memberId:tableuser?._id,societyId:society?._id}))}>
               <Image src='https://cdn-icons-png.flaticon.com/512/4578/4578073.png' width={25} height={25}></Image>
               </Button>
             </Tooltip>
           </Col>











</>

            :  isMember || tableuser?.followers.includes(userAuth?._id )?
             <>
                <Col css={{ d: "flex" }}>
             
             <Tooltip content="Promote to member">
             <Button
              auto
              flat rounded
             color='error'
            >   
              <Image 
           alt="Default Image"
           width={25}
           height={25}
           src='https://cdn-icons-png.flaticon.com/512/8010/8010315.png'></Image>
             Message
            </Button>
            <Col css={{ d: "flex" }}>
            <Button 
          auto
          rounded flat
          onClick={() => dispatch(userUnFollowAction(tableuser?.id))}
        color='secondary'
        >
            <Image 
       alt="Default Image"
       width={25}
       height={25}
       src='https://cdn-icons.flaticon.com/png/512/3357/premium/3357257.png?token=exp=1659901667~hmac=1195dd7a95d59c8d257d7c7a5eba5d28'></Image>
        Unfollow
        </Button>
        </Col>
             </Tooltip>
           </Col>

            </>  
          :  isMember || !tableuser?.followers.includes(userAuth?._id )?
          <Col css={{ d: "flex" }}>
          <Button
          auto
          flat rounded
         color='error'
        >   
          <Image 
       alt="Default Image"
       width={25}
       height={25}
       src='https://cdn-icons-png.flaticon.com/512/8010/8010315.png'></Image>
         Message
        </Button>



          <Button 
          auto
          shadow
          rounded flat
          onClick={() => dispatch(userFollowAction(tableuser?.id))}
        color='secondary'
        >
            <Image 

       alt="Default Image"
       width={25}
       height={25}
       src='https://cdn-icons-png.flaticon.com/512/5661/5661177.png'></Image>
          Follow
        </Button>
        </Col>:
  society?.awaitedmembers?.find(element=>element?._id==userAuth?._id)? null:null
        
       

          }
          
           
          </Row>
        );
      default:
        return cellValue;
    }
  };

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];





  return (
    <div class="flex flex-col">
    <div class="m-auto flex-center m-1">
      <div class="flex justify-evenly   ">
    {/* {appErr|| serverErr? <h1>{serverErr}{appErr}</h1>:null} */}
 <Card css={{$$cardColor: '$colors$#16181A', mw: "700px" ,bw:0}}>
 <Card.Header>
 <Avatar
     size="lg"
     src={society?.logo}
     color="primary"
    
     squared
   />
   <Grid.Container css={{ pl: "$6",p:5 }}>
     <Grid xs={12}>
       <Text h4 css={{ lineHeight: "$xs" }}>
       {society?.title}
       </Text>
     </Grid>
     <Grid xs={12}>
       <Text css={{ color: "$accents8" }}>@{society?.handle}</Text>
     </Grid>
   </Grid.Container>

   {awaited?<Button color="secondary" auto flat disabled shadow>
   Awaited
   </Button> : isMember || isPresident ||isVicePresident || isTresurer?<Link to={`/society-post/${society._id}`}><Text color='secondary' b size={15}>Post</Text></Link>  : <Button color="secondary" auto flat shadow onClick={()=>dispatch(joinsocietyAction(society?._id))} >
   join
   </Button>}
   
   <Spacer x={1}/>
   <Image src="https://cdn-icons-png.flaticon.com/512/747/747952.png"
             alt="Default Image"
             width={50}
             height={50}
             title="asas"/>
             <text class="inline-block ">12</text>
 </Card.Header>
 <Divider></Divider>
 
 <Card.Body css={{ py: "$5" ,pl:10 }}>
   <Text b
       color="default"
       css={{p:5}}
       size={15}>
     {society?.description}
   </Text>
   <Spacer y={1}/>
   <Grid.Container gap={1} class="flex justify-evenly m-auto  " css={{p:10}}>
   <Grid flex>
     <Row css={{p:5}}>
     <Button size="l"  color="error"  css={{h: "$25",p:5}} auto fill ghost>
       <Col >
       <Row css={{pt:10}}>   <Avatar 
 src={society?.president?.profilePhoto}
 
 size="lg"
/>
<Grid.Container css={{ pl: "$6"  }}>
     <Grid xs={12}>
       <Text h5 css={{ lineHeight: "$xs" }}>
       {society?.president?.firstName +' '+society?.president?.lastName }
       </Text>
     </Grid>
     <Grid xs={10}>
       <Text css={{ color: "$accents8" }}> 🏆{society?.president?.points}</Text>
     </Grid>
   </Grid.Container>




</Row>
   <Row css={{p:10}}>
 
    President

   </Row>
   </Col>
    

      </Button>
      <Spacer x={1}/>
      <Button size="l"  color="secondary"  css={{h: "$25" ,p:5}} auto ghost>
       <Col>
       {!society?.vicepresident  ? <Text css={{p:10}} align="center"> <Image src='https://cdn-icons.flaticon.com/png/512/3357/premium/3357257.png?token=exp=1660251519~hmac=bdd633e1d0a195276c59d399aca8ea6e' width={25} height={25}></Image></Text>:    <Row css={{pt:10}}>   <Avatar css={{mt:2}} bordered={false}
src={society?.vicepresident?.profilePhoto}

 size="md"
/>
<Grid.Container css={{ pl: "$6" }}>
     <Grid xs={12}>
       <Text h5 css={{ lineHeight: "$xs" }}>
       {' '+society?.vicepresident?.firstName +' '+society?.vicepresident?.lastName }
       </Text>
     </Grid>
     <Grid xs={10}>
       <Text css={{ color: "$accents8" }}> 🏆{society?.vicepresident?.points}</Text>
     </Grid>
   </Grid.Container>


</Row>}
   
   <Row css={{p:10}}>
 
    Vice-President

   </Row>
   </Col>
    

      </Button>
      
      
     </Row>
     <Spacer y={1}/>
     {/*SECOND ROW FOR TRESURER AND MEMBERS */}
     <Row css={{p:5}}>
      
     <Button size="l"  color="warning"  css={{h: "$25",p:5,w:"$50"}} auto ghost>
       <Col>{!society?.treasurer  ?  <Text css={{p:10}} align="center"> <Image src='https://cdn-icons.flaticon.com/png/512/3357/premium/3357257.png?token=exp=1660251519~hmac=bdd633e1d0a195276c59d399aca8ea6e' width={25} height={25}></Image></Text>:  <Row css={{pt:10}}>   <Avatar css={{mt:5}}
src={society?.treasurer?.profilePhoto}

 size="md"
/>
<Grid.Container css={{ pl: "$6" }}>
     <Grid xs={12}>
       <Text h5 css={{ lineHeight: "$xs" }}>
       {society?.treasurer?.firstName +' '+society?.treasurer?.lastName }
       </Text>
     </Grid>
     <Grid xs={10}>
       <Text css={{ color: "$accents8" }}> 🏆{society?.treasurer?.points}</Text>
     </Grid>
   </Grid.Container>



</Row>}
     
   <Row css={{p:10}}>
 
   Tresurer

   </Row>
   </Col>
    

      </Button>
      <Spacer x={1}/>
   <Col>
   <Row css={{p:0}}>



<Grid xs={5} css={{pt:25}} >
 {society?.members?.length<=0 && society?.awaitedmembers?.length>0 ?
 <Button css={{h:"$20",p:10}} onClick={() => setVisible(true)} flat size='sm' color='warning'><Text color='warning' size={15} >awaited members{society?.awaitedmembers?.length}</Text></Button> :society?.members?.slice(0, 5).map((member) => ( 
<Avatar.Group >
    <Avatar
      key={member?.id}
      size="lg"
      pointer
      src={member?.profilePhoto}
      bordered
      color="gradient"
      stacked
      onClick={() => setVisible(true)}
    />
</Avatar.Group>


 ))}
 </Grid>







</Row>
<Row css={{p:20}}>
  <Text color='warning' align='center' size={15} b>{society?.members?.length}MEMBERS</Text>
</Row>
</Col>


      <Spacer x={1}/>
    
      
      <Spacer y={1}/>
     </Row>
     <Grid>
 
 </Grid>
     
     
       </Grid>
       </Grid.Container>

       <Spacer y={1}/>


 


 </Card.Body>
 <Divider></Divider>
 {/* <Card.Footer >


 </Card.Footer> */}
 <div class="flex justify-evenly"> <Text css={{p:10}} size={20} color="#888888" weight='bold'>
     <Text
       b
       color="default"
       css={{p:5}}
       size={20}
     >
     {society?.xp}
     </Text>
     ⚡XP
   </Text>
   <Spacer x={5}/>
   <Text 
  
   size={20}
   css={{
     textGradient: "45deg, $yellow600 -20%, $red600 100%",p:10
   }}
   weight="bold"
 >
   #153/1500
 </Text></div>
 <Spacer x={10}/>
 <Text  size={30} color="warning" weight='bold' align="center">
     <Text
       b
       color="default"
       css={{p:5}}
       size={30}
     >
    {society?.posts.length}
     </Text>
      Posts 
   </Text>
</Card>
</div>
{/* modal for member management*/}
<div >
   
      <Modal
        scroll
        fullScreen
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Row>
          <Col>
       <Row css={{pt:10}}>   <Avatar 
 src={society?.president?.profilePhoto}
 
 size="lg"
/>
<Grid.Container css={{ pl: "$6" }}>
     <Grid xs={12}>
       <Text h5 css={{ lineHeight: "$xs" }}>
       {society?.president?.firstName +' '+society?.president?.lastName }
       </Text>
     </Grid>
     <Grid xs={10}>
       <Text css={{ color: "$accents8" }}> 🏆{society?.president?.points}</Text>
     </Grid>
   </Grid.Container>
</Row>
   <Row css={{p:10}}>
    President
   </Row>
   </Col>
   <Col>
       {!society?.vicepresident  ? <Text css={{p:10}} align="center"> <Image src='https://cdn-icons.flaticon.com/png/512/3357/premium/3357257.png?token=exp=1660251519~hmac=bdd633e1d0a195276c59d399aca8ea6e' width={25} height={25}></Image></Text>:    <Row css={{pt:10}}>   <Avatar css={{mt:2}} bordered={false}
src={society?.vicepresident?.profilePhoto}

 size="md"
/>
<Grid.Container css={{ pl: "$6" }}>
     <Grid xs={12}>
       <Text h5 css={{ lineHeight: "$xs" }}>
       {' '+society?.vicepresident?.firstName +' '+society?.vicepresident?.lastName }
       </Text>
     </Grid>
     <Grid xs={10}>
       <Text css={{ color: "$accents8" }}> 🏆{society?.vicepresident?.points}</Text>
     </Grid>
   </Grid.Container>


</Row>}
   <Row css={{p:10}}>
    Vice-President
   </Row>
   </Col>
   <Col>{!society?.treasurer  ?  <Text css={{p:10}} align="center"> <Image src='https://cdn-icons.flaticon.com/png/512/3357/premium/3357257.png?token=exp=1660251519~hmac=bdd633e1d0a195276c59d399aca8ea6e' width={25} height={25}></Image></Text>:  <Row css={{pt:10}}>   <Avatar css={{mt:5}}
src={society?.treasurer?.profilePhoto}

 size="md"
/>
<Grid.Container css={{ pl: "$6" }}>
     <Grid xs={12}>
       <Text h5 css={{ lineHeight: "$xs" }}>
       {society?.treasurer?.firstName +' '+society?.treasurer?.lastName }
       </Text>
     </Grid>
     <Grid xs={10}>
       <Text css={{ color: "$accents8" }}> 🏆{society?.treasurer?.points}</Text>
     </Grid>
   </Grid.Container>



</Row>}
     
   <Row css={{p:10}}>
 
   Tresurer

   </Row>
   </Col></Row>
          </Text>

          {appErr|| serverErr? <Text color='error' b>{serverErr}{appErr}</Text>:null}
        </Modal.Header>
        <Modal.Body css={{height: '100%', width: '100%'}}>
            <Text color='secondary' size={25}  b align="center" >MEMBERS</Text>
            <div>
            <Table id="modal-description"
        css={{ minWidth: "100%", height: "100%" }}
      aria-label="Example table with custom cells"
     
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column?.uid}
            hideHeader={column?.uid === "actions"}
            align={column?.uid === "actions" ? "center" : "start"}
          >
            {column?.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={society?.members}>
        {(item) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
            </div>
    
    <Text color='warning' size={25}  b align="center">Awaited Members</Text>
    <div>
    <Table scroll
      aria-label="Example table with custom cells"
      css={{ minWidth: "100%", height: "100%" }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column?.uid}
            hideHeader={column?.uid === "actions"}
            align={column?.uid === "actions" ? "center" : "start"}
          >
            {column?.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={society?.awaitedmembers}>
        {(item) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
    </div>
   
        </Modal.Body>
        <Modal.Footer>
          <Button flat auto color="error" onClick={() => setVisible(false)}>
            Close
          </Button>
          <Button onClick={() => setVisible(false)}>Agree</Button>
        </Modal.Footer>
      </Modal>
    </div>
   <div class=" m-auto ">
   {postLists?.length<=0?<h1>no posts yet</h1>:postLists?.map((post)=>(
<div class="flex justify-evenly " key={post?.id} >
<Card css={{$$cardColor: '$colors$#16181A', mw: "500px" ,bw:0}} >
<Card.Header css={{
 p:0
}}>
<Grid.Container gap={1} alignContent="center">
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
        description={society?.president?._id.toString()===post.user._id.toString()? <Text color='error'>President</Text>:society?.vicepresident?._id.toString()===post.user._id.toString()? <Text color='secondary'>Vice-President</Text>:society?.treasurer?._id.toString()===post.user._id.toString()? <Text color='warning'>Tresurer</Text>: <Text color='primary'>Member</Text>}
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
{post?.user?._id===userAuth?._id ? <Link  to={`/update-post/${post?.id}`}>

          <Image src="https://cdn-icons.flaticon.com/png/512/4620/premium/4620789.png?token=exp=1659818371~hmac=560eddca31daa8cfe3c27a7c683b6730"
                  alt="Default Image"
                  width={20}
                  height={20}/>
          </Link> :null}
</Card.Header>

<Card.Body css={{p:0 }}>


    {post?.image.split('.').pop()==='png' || post?.image.split('.').pop()==='jpeg' || post?.image.split('.').pop()==='jpg' ? <Card.Image src={post?.image}></Card.Image>:<div  className='player-wrapper' >
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
  
  <Text b
  color='warning' 
  size={15}
css={{
  pl:15,pt:0,pb:10
}}
>
{post?.description}
  </Text>

  <AddComment css={{
  pl:15,pt:0,pb:5
}} post={post}/>
  
</Card.Body>
{/* <Card.Divider /> */}

<Card.Footer css={{
  pl:15,pt:0,pb:5
}}>
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
  

<Text css={{p:10}}
  
  size={12}
 color='secondary' 
><DateFormatter date={post?.createdAt}/></Text>
<Spacer inline x={0.5} />
</Card>

</div>
   ))}
   </div>
    
   
    
    </div>
  </div>
  )
}

export default SingleSociety