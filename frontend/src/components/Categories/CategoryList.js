import React, { useEffect } from 'react'

import { Loading,Table,Text,User } from "@nextui-org/react";
import{useDispatch,useSelector}from 'react-redux';
import { fecthCategoriesAction } from '../../redux/slices/category/categorySlice'
import DateFormatter from '../../utils/DateFormatter';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const dispatch=useDispatch();

  useEffect(()=>{
   dispatch(fecthCategoriesAction());
  },[dispatch]);

  const category=useSelector(state=>state?.category);
  const {categoryList,loading,appErr,serverErr}=category;
  console.log(category);

  return (
    
   
    <div> 
      {loading?<Loading size="md"/>:appErr || serverErr ? <Text  color="error">{serverErr}-{appErr}</Text>:categoryList===0?<Text  color="error">No category Found</Text>:
    <Table
      aria-label="Example static collection table"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header>
        <Table.Column>NAME</Table.Column>
        <Table.Column>ROLE</Table.Column>
        <Table.Column>STATUS</Table.Column>
        <Table.Column>Edit</Table.Column>
      </Table.Header>
      <Table.Body>
        {categoryList?.map(category=>{return (
          <Table.Row>
          <Table.Cell><User
              bordered
              as="button"
              size="lg"
              color="primary"
              name={category?.user?.firstName + category?.user?.firstName}
              description={category?.user?.email}
              src={category?.user?.profilePhoto}
            /></Table.Cell>
          <Table.Cell>{category?.title}</Table.Cell>
          <Table.Cell>{<DateFormatter date={category?.user?.createdAt}/>}</Table.Cell>
          <Table.Cell>  
          <Link  to={`/update-category/${category?._id}`}
                  type="button"> Edit </Link>
        </Table.Cell>
       
        </Table.Row>)
        })}
      </Table.Body>
    </Table>
    }</div>
  )
}

export default CategoryList