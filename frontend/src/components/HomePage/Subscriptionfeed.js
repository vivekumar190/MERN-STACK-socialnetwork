import React, { useEffect } from 'react'
import { Grid, Collapse, Text, Avatar, Link,Switch,changeTheme,useTheme,Card, User, Divider} from "@nextui-org/react";
import { userProfileAction } from '../../redux/slices/users/usersSlices';
import { useDispatch, useSelector } from 'react-redux';
import { fetchallsocietyAction, fetchUsersocietyAction } from '../../redux/slices/Societies/SocietySlices';



const Subscriptionfeed = () => {

  const user=useSelector(state=>state?.users);
  const {userAuth,follow,unfollow,floading,ufloading,}=user;


const dispatch = useDispatch();


// select user datata from store 

const users=useSelector(state=>state.users);
const {profile,luoading,uappErr,userverErr}=users;
const soc=useSelector(state=>state?.society);
const {usersocietyList,loading,appErr,serverErr,joinRequested}=soc;

useEffect(()=>{
  dispatch(userProfileAction(userAuth?._id));
  },[dispatch,follow,unfollow]);

  useEffect(()=>{
    dispatch(fetchUsersocietyAction(userAuth?._id));
    },[dispatch]); 

  return (
    <div class="parent lg feedbox static conatiner left-0 top-15">
          <Text className=" text-center"
        
        size={40}
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
        weight="bold"
      >
     Your Societies
     and 
     followings
      </Text>
    <Grid.Container gap={2} css={{w:350,p:10}}>
      <Grid>
        <Collapse.Group shadow>
          {appErr||serverErr ?<h1>{appErr}{serverErr}</h1>:usersocietyList?.length<=0 ?<Text>Explore societies and become members or start your own crowd one ypur ahve 1000trophiers</Text>:usersocietyList?.map((society)=>(
<Collapse
title={<Text h4>{society?.title}</Text>}
subtitle={`${society?.members?.length} Members `}
contentLeft={
  <Avatar
    size="lg"
    src={society?.logo}
    color="secondary"
    bordered
    squared
  />
}
>
<Text color='error' size={20} align='center'b>President : </Text>
<User
        src={society?.president?.profilePhoto}
        name={society?.president?.firstName+' '+'  '+society?.president?.lastName}
        description={society?.president?.points}
        size="lg"
      />

<Divider/>
<Text color='error' size={20} align='center'b>Members : </Text>
{society?.members?.map((member)=>(  
    <User
        src={member?.profilePhoto}
        name={member?.firstName+' '+member?.lastName}
        description={member?.points}
        size="lg"
      />
      ))}
    

   
</Collapse>
          ))}


    
  
   
       

        </Collapse.Group>
      </Grid>



    </Grid.Container>
    </div>
  )
}

export default Subscriptionfeed