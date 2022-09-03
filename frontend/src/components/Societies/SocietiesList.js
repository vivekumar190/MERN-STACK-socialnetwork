import React ,{useEffect, useState}from 'react'
import { Card, Grid, Text,Avatar, Image, Button ,Container,Row, Spacer, Col, User, Divider, Loading} from "@nextui-org/react";
import { fetchallsocietyAction, joinsocietyAction } from '../../redux/slices/Societies/SocietySlices';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from "react-router-dom";
const SocietiesList = () => {




  
  const dispatch=useDispatch();




    const soc=useSelector(state=>state?.society);
    const {societyList,loading,appErr,serverErr,joinRequested}=soc;
    const user=useSelector(state=>state?.users);
    const {userAuth}=user;
    const [pageNumber,setPageNumber]=useState(1);    

    useEffect(()=>{
      dispatch(fetchallsocietyAction(pageNumber));
      },[dispatch,joinRequested,pageNumber]);

console.log(pageNumber);
    


  return (
    <div class="flex flex-col  ">
    <div class="m-20 flex-center m-1" onDragEnd={()=>setPageNumber(pageNumber+1)}>
  
    <Text className=" text-center"
        h1
        size={60}
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
        weight="bold"
      >
     Top Crowds<Image src='/icons/6470829.png' height={50} width={50}></Image>
      </Text>

    {appErr|| serverErr? <h1>{serverErr}{appErr}</h1>:societyList?.length<=0?<h1>No societies created</h1>:societyList?.map((society)=>(
      
       <div class="flex justify-evenly   ">
       
 <Card css={{$$cardColor: '$colors$#16181A', mw: "550px" ,bw:0}}
 isPressable
 isHoverable shadow>
 <Card.Header>
  <Link to={`/societies/${society._id}`}> <Avatar
     size="lg"
     src={society?.logo}
     color="primary"
     squared
   /> </Link>
    
   <Grid.Container  css={{ pl: "$3" }}>
   <Link to={`/societies/${society._id}`}>
     <Grid xs={12}>
       <Text h4 css={{ lineHeight: "$xs" }}>
       {society?.title}
       </Text>
     </Grid>
     <Grid xs={12}>
       <Text css={{ color: "$accents8" }}>@{society?.handle}</Text>
     </Grid>
     </Link>
   </Grid.Container>
  

{society?.awaitedmembers?.includes(userAuth?._id )?<Button color="secondary" auto flat disabled shadow>
   Awaited
   </Button> : society?.members?.includes(userAuth?._id ) || society?.president?._id==userAuth?._id ||society?.vicepresident?._id==userAuth?._id || society?.treasurer?._id==userAuth?._id?<Link to={`/society-post/${society._id}`}><Text color='secondary' size={15}>Post</Text></Link>  : <Button color="secondary" auto flat shadow onClick={()=>dispatch(joinsocietyAction(society?._id))} >
   join
   </Button>}
   
   <Spacer x={1}/>
   <Image 
   src='/icons/6470829.png'
             alt="Default Image"
             width={40}
             height={40}
             title="asas"/>
             <text class="inline-block ">12</text>
 </Card.Header>
 <Divider></Divider>
 
 <Card.Body css={{ py: "$5"  }}>
   <Text b
       color="default"
       css={{p:5}}
       size={15}>
     {society?.description}
   </Text>
   <Spacer y={1}/>
   <Grid.Container class="flex justify-evenly">
   <Grid flex>
     <Row css={{p:5}}>
     <Button size="l"  color="error"  css={{h: "$25",p:5}}  fill ghost>
       <Col>
       <Row css={{pt:10}}>   <User css={{mt:5}}
 src={society?.president?.profilePhoto}
 name={society?.president?.firstName +' '+society?.president?.lastName }
 size="md"
/></Row>
   <Row css={{p:10}}>
 
    President

   </Row>
   </Col>
    

      </Button>
      <Spacer x={1}/>
      <Button size="l"  color="secondary"  css={{h: "$25" ,p:5}} auto ghost>
       <Col>
       {!society?.vicepresident  ? <Text css={{p:10}}>Not assigned</Text>:    <Row css={{pt:10}}>   <User css={{mt:2}} bordered={false}
src={society?.vicepresident?.profilePhoto}
name={' '+society?.vicepresident?.firstName +' '+society?.vicepresident?.lastName }
 size="md"
/></Row>}
   
   <Row css={{p:10}}>
 
    Vice-President

   </Row>
   </Col>
    

      </Button>
      
      
     </Row>
     <Spacer y={1}/>
     {/*SECOND ROW FOR TRESURER AND MEMBERS */}
     <Row css={{p:5}}>
      
     <Button size="l"  color="warning"  css={{h: "$25"}} auto ghost>
       <Col>{!society?.treasurer  ? <Text css={{p:10}}>Not assigned</Text>:  <Row css={{pt:10}}>   <User css={{mt:5}}
src={society?.treasurer?.profilePhoto}
name={society?.treasurer?.firstName +' '+society?.treasurer?.lastName }
 size="md"
/></Row>}
     
   <Row css={{p:10}}>
 
   Tresurer

   </Row>
   </Col>
    

      </Button>
      <Spacer x={2}/>
      <Button size="l"   color="#888888" css={{h: "$25"}} auto flat shadow ghost>
       <Col><Row css={{pl:10,pt:5}}>    
      
<Text  
   size={20} align="center"
   css={{
     textGradient: "45deg, $blue600 -20%, $pink600 50%",p:5
   }}
  
>
{society?.members?.length}
</Text></Row>
<Row css={{p:10}}>
 
Members

   </Row>
   </Col>
    

      </Button>
      <Spacer x={1}/>
    
      
      <Spacer y={1}/>
     </Row>
     <Grid>
 
 </Grid>
     
     
       </Grid>
       </Grid.Container>

       <Spacer y={1}/>

       <Grid.Container class="flex justify-evenly">
 <Grid>
 <Text  size={20} color="warning" weight='bold'>
     <Text
       b
       color="default"
       css={{p:5}}
       size={20}
     >
    {society?.posts.length}
     </Text>
      Posts
   </Text>
 </Grid>
<Spacer x={4}/>
 <Grid >
 <Text  size={20} color="error" weight='bold'>
     <Text
       b
       color="default"
       css={{p:5}}
       size={20}
     >
     123
     </Text>
      Likes
   </Text>
 </Grid>
 <Spacer x={1}/>
 <Grid>

 </Grid>
 
</Grid.Container>

 </Card.Body>
 <Divider></Divider>
 {/* <Card.Footer>
 <Text  size={15} color="#888888" weight='bold'>
     <Text
       b
       color="default"
       css={{p:5}}
       size={15}
     >
     {society?.xp}
     </Text>
     ⚡XP
   </Text>
   <Spacer x={5}/>
   <Text
   h1
   size={15}
   css={{
     textGradient: "45deg, $yellow600 -20%, $red600 100%",
   }}
   weight="bold"
 >
   #153/1500
 </Text>
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
 <Spacer x={20}/>
</Card>
</div>
    ))}


 

        <Spacer x={20}/>


        <div class='flex justify-evenly mb-50'>
    {loading?
    <Loading
        loadingCss={{ $$loadingSize: "100px", $$loadingBorder: "10px" }}
      />:null}
    {loading?       <Button disabled auto bordered color="warning" css={{ px: "$10" }}>
          <Loading type="points-opacity" color="currentColor" size="sm" />
        </Button> :<Button auto bordered color="warning" css={{ px: "$13" }} onClick={()=>setPageNumber(pageNumber+1)}>Load More</Button>}
      
    </div>
    </div>
    
  
  </div>
  )
}

export default SocietiesList