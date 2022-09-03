import { useEffect } from "react";

import React from "react";
import { User, Row, Col,Card, Text, Button, Spacer, Grid, Image, Divider, Tooltip, Loading } from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";
import {
  HeartIcon,
  EmojiSadIcon,
  UploadIcon,
  UserIcon,
} from "@heroicons/react/outline";

import { MailIcon, EyeIcon } from "@heroicons/react/solid";
import { userFollowAction, userProfileAction, userUnFollowAction } from "../../../redux/slices/users/usersSlices";
import{useDispatch,useSelector} from 'react-redux';
import DateFormatter from "../../../utils/DateFormatter";
import Moment from "react-moment";
import { baseUrl } from "../../../utils/baseUrl";
import ReactPlayer from "react-player";
import { fetchPostDetailsAction } from "../../../redux/slices/posts/postSlices";

export default function Profile() {

const {id}=useParams();
console.log(id);

const dispatch = useDispatch();


// select user datata from store 

const users=useSelector(state=>state.users);
const {profile,loading,appErr,serverErr}=users;
console.log(profile?.user?.presidentof);
const [following, setFollowing] = React.useState(false);
const user=useSelector(state=>state?.users);
const {userAuth,follow,unfollow,floading,ufloading,}=user;

useEffect(()=>{
  dispatch(userProfileAction(id));
  },[dispatch,id,follow,unfollow]);

  return (
    <>
      <div className="h-screen flex overflow-hidden">
        {/* Static sidebar for desktop */}

        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="flex-1  z-0 flex overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
              <article>
                {/* Profile header */}
                <div>
                  <div>
                    <img
                      className="h-32 w-full object-cover lg:h-48"
                      src={`${profile?.profilePhoto}`}
                      alt={profile?.fullName}
                    />
                  </div>
                  


{/* Profile custom header */}


                  <div className="max-w-5xl relative mx-auto px-10 sm:px-6 lg:px-8 flex:center">
                    <div className="items-center">

                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                      <div className="flex -mt-20 auto">
                      <Image
           class='rounded-full px-0 align-top'
            src={`${profile?.profilePhoto}`}
            width={150}
            height={150} 
            css={{mt:0}}
          />
          {profile?.isAccountVerified ?  <Tooltip  align="center" content="E-Mail verified ">
          <Button  size='sm'shadow color='secondary'auto icon={<Image src='https://cdn-icons-png.flaticon.com/512/2996/2996119.png' width={20}
                  height={20} />}>
   
</Button>
</Tooltip> :  <Tooltip  align="center" content="E-Mail not verified ">
          <Button  size='sm'shadow color="error" bordered auto>
          <Text align='center' >
💀 
</Text>
</Button>
</Tooltip> }
        
                      </div>
                      <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className=" flex flex-col 2xl:block mt-10 min-w-0 flex-1">
                          <h1 className="text-2xl font-bold text-gray-900 self-center">
                            {/* {profile?.fullName} */}
                            <Text color="secondary" weight="bold" size={45} align="center">{profile?.firstName +' '+ profile?.lastName}</Text>
                            

        <Text align='center'size={20} css={{
          textGradient: "90deg, $yellow600 -20%, $red600 100%",
        }}
        >
          
           🏆 {profile?.points}
        
        </Text>{profile?.isPresident? <Text color="default" size={20}align="center">President</Text>:profile?.isVicepresident? <Text color="default" size={20}align="center">Vice-President</Text>:profile?.user?.istreasurer? <Text color="default" size={20}align="center">Tresurer</Text>:profile?.user?.member? <Text color="default" size={20}align="center">Member</Text>:null}
          
          <Text align='center' css={{
          textGradient: "45deg, $yellow600 -20%, $red600 100%",
        }}
        ></Text>
            <Text align='center'size={20} css={{
          textGradient: "45deg, $yellow600 -20%, $red600 100%",
        }}
        >
          {profile?.presidentof ?<Link  to='/societies' align='center'>
      {profile?.presidentof?.handle}
     </Link>:null}
     {profile?.vicepresidentof ?<Link  to='/societies' align='center'>
      {profile?.vicepresidentof?.handle}
     </Link>:null}
     {profile?.memberof ?<Link  to='/societies' align='center'>
      {profile?.memberof?.handle}
     </Link>:null}
     {profile?.tresurerof ?<Link  to='/societies' align='center'>
      {profile?.tresurerof?.handle}
     </Link>:null}
           
        </Text>
         
                            {/* <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            
                            </span> */}
                            {/* Display if verified or not */}
                            {/* <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-green-600 text-gray-300">
                              Account Verified
                            </span>

                            <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-red-600 text-gray-300">
                              Unverified Account
                            </span> */}
                          </h1>
                          <p className=" text-lg">
                           <Text size={13} align="center" >CREATED:  <Moment fromNow >{profile?.user?.createdAt}</Moment></Text>
                          </p>
                          <p className="text-green-400 mt-2 mb-2">
                            {/* {profile?.posts.length} posts{" "}
                            {profile?.followers.length} followers{" "}
                            {profile?.following.length} following */}
                          </p>
                          {/* Who view my profile */}
                          <div className="flex items-center  mb-2">
                            {/* <EyeIcon className="h-5 w-5 " /> */}
                            <div className="pl-2">
                              {/* {profile?.viewedBy?.length}{" "} */}
                              {/* <span className="text-indigo-400 cursor-pointer hover:underline">
                                users viewed your profile
                              </span> */}
                            </div>
                          </div>

                          {/* is login user */}
                          {/* Upload profile photo */}
                          {userAuth?._id===profile?._id ?  <Link to={`/profile-photo-upload/${profile?._id}`}
                           
                           className="inline-flex justify-center w-48 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                         >
                           <UploadIcon
                             className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                             aria-hidden="true"
                           />
                           <span>Change Photo</span>
                         </Link>:null}
                        
                        </div>

                        <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 items-left">
                          {/* // Hide follow button from the same */}
                          <Col   span={13} css={{p:5 }}>
          <Row css={{mb:20}}>
         
           {floading || ufloading ?
           
           <Button 
              auto
              rounded flat
              onClick={() => dispatch(userUnFollowAction(profile?._id))}
            color='secondary'
            >
                <Image 
           alt="Default Image"
           width={25}
           height={25}
           src='https://cdn-icons.flaticon.com/png/512/3357/premium/3357257.png?token=exp=1659901667~hmac=1195dd7a95d59c8d257d7c7a5eba5d28'></Image>
            <Loading type="points"/>
            </Button>
           
           
           
           :
             
           profile?.followers.includes(userAuth?._id )?
           
           <Button 
              auto
              rounded flat
              onClick={() => dispatch(userUnFollowAction(profile?.id))}
            color='error'
            >
                <Image 
           alt="Default Image"
           width={25}
           height={25}
           src='https://cdn-icons-png.flaticon.com/512/7915/7915348.png'></Image>
              UnFollow
            </Button>:
            !profile?.followers.includes(userAuth?._id )?
            
            <Button 
              auto
              shadow
              rounded flat
              onClick={() => dispatch(userFollowAction(profile?.id))}
            color='secondary'
            >
                <Image 

           alt="Default Image"
           width={25}
           height={25}
           src='https://cdn-icons-png.flaticon.com/512/5661/5661177.png'></Image>
              Follow
            </Button>
          
    :null}
           
            <Spacer x={1}/>
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
            <Spacer x={1}/>
            {userAuth?._id===profile?._id ?  <Link to={`/update-profile/${profile?._id}`}>
           <Image 
           alt="Default Image"
           width={20}
           height={20}
           src='https://cdn-icons.flaticon.com/png/512/4620/premium/4620789.png?token=exp=1659818371~hmac=560eddca31daa8cfe3c27a7c683b6730'></Image>
           </Link> :null }
          
           
          </Row>
          <Row>
          {profile?.isAdmin ?<Text color="default" weight="bold" css={{textGradient: "45deg, $yellow600 -20%, $red600 100%",pr:10}}  size={30} align="center" >ADMIN</Text>:<Image src='http://192.168.1.4:5000/uploads/ACE.png' width={100} height={100} ></Image>}
          </Row>
          <Row>
          <Text
            
            size={20}
            css={{ mt: "$5" }}
            color="#888888"
          >
            {profile?.bio}
          </Text>
          </Row>

          {profile?.isTrending?<Text
        h1
        size={20}
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
        weight="bold"
      >
        # Trending in your Area
      </Text>:null}
          
          <Divider width={10}> </Divider>
          <Row>

          <Text  size={20} color="#888888">
          <Text
            b
            color="default"
            css={{p:5}}
            size={20}
          >
      {profile?.following?.length}
          </Text>
           Following
        </Text>
        <Spacer inline x={0.5} />
        <Text size={20} color="#888888">
          <Text
            b
            color="default"
            css={{p:5}}
            size={20}
          >
             {profile?.followers?.length}
          </Text>
           Followers
        </Text>
        <Text  size={20} color="#888888">
          <Text
            b
            color="default"
            css={{p:5}}
            size={20}
          >
          {profile?.posts?.length}
          </Text>
           Posts
        </Text>
          </Row>
          <Row>
          <Text
        h1
        size={20}
        css={{
          textGradient: "45deg, $yellow600 -20%, $red600 100%",
        }}
        weight="bold"
      >
        {/* Rank#153/1500 */}
      </Text>
          </Row>
          
        </Col>
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 truncate">
                        {/* {profile?.lastName} */}Last Name
                      </h1>
                    </div>
                  </div>
                      


  
                    </div>
     
                    <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 truncate">
                        {/* {profile?.lastName} */}Last Name
                      </h1>
                    </div>
                  </div>
                </div>
                {/* Tabs */}
                <div className="mt-6 sm:mt-2 2xl:mt-5">
                  <div className="border-b border-red-900">
                    <div className="max-w-5xl mx-auto "></div>
                  </div>
                </div>
                <div className="flex justify-center place-items-start flex-wrap  md:mb-0">
              
         
                  {/* All my Post */}
                  <div className="w-full md:w-2/3 px-4 mb-4 md:mb-0">
                    <h1 className="text-center text-xl border-gray-500 mb-2 border-b-2">
                      My Post
                    </h1>
                    {/* Loo here */}
                    <div class="gap-8 columns-3 gap-4">
                    {profile?.posts?.length<=0?<h2>no posts yet</h2>:profile?.posts?.map(post=>(
  <div >

  
 
  
 

         {post?.image.split('.').pop()==='png' ||post?.image.split('.').pop()==='jpeg' || post?.image.split('.').pop()==='jpg' ?<div><Text align='center' bold size={20}color="secondary">{post?.title}</Text><Card.Image  src={post?.image}></Card.Image></div> :<div  className='player-wrapper aspect-video' >
         
        <ReactPlayer
          className='react-player'
          css={{
            pl:15,pt:0
          }}
          rounded
           onPlay={()=>dispatch(fetchPostDetailsAction(post?.id))}
          
          controls={true} playsinline={true}
          url={post?.image}
          width='100%'
          height='100%'
          alt={post?.image}
        />
        <Text align='center' bold size={15}color="secondary">{post?.title}</Text>
      </div>} 
   


  


</div>
                    ))}
                  </div>
                  </div>
                </div>
              </article>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
