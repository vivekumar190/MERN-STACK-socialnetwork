import React,{ useEffect } from "react";
import{useDispatch, useSelector} from 'react-redux';
import Select from 'react-select';
import { Dropdown ,Loading,Text} from "@nextui-org/react"
import { fecthCategoriesAction } from "../../redux/slices/category/categorySlice";
import { Formik } from "formik";


// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];


const CategorySelector = (props) => {
  
  console.log(props);
  //dispatch action
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fecthCategoriesAction());
  }, [dispatch]);

  const [selected, setSelected] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected)?.join(", ").replaceAll("_", " "),
    [selected]
  );

  //select categories
  const category = useSelector(state => state?.category);
  const { categoryList, loading, appErr, serverErr } = category;

  const allCategories = categoryList?.map(category => {
    return {
      label: category?.title,
      value: category?.title,
      name: category?.title,
      key: category?.title
    };
  });
console.log(allCategories);
  //handleChange
  const handleChange = value => {
    props.onChange("category", value);
  };
  //handleBlur
  const handleBlur = () => {
    props.onBlur("category", true);
  }



  return (

    <>
    {loading ? (
      <h3 className="text-base text-green-600">
        Product categories list are loading please wait...
      </h3>
    ) : (
      <div className=" bg-grey-500">
      <Select  className="font-medium bg-grey  text-green-600 "
        options={allCategories}
        onChange={handleChange}
        onBlur={handleBlur}
        id="category"
        value={props?.value?.label}
      />
      </div>
      
    //   <Dropdown  >
    //   <Dropdown.Button flat     >{selectedValue}</Dropdown.Button>
    //   <Dropdown.Menu aria-label="Dynamic Actions"  items={allCategories}   
    //       onSelectionChange={setSelected}
    //  disallowEmptySelection
    //  selectionMode="single"
    //  selectedKeys={selected}
    //  onChange={handleChange} 
    //  onBlur={handleBlur}   
    //  value={props?.value?.selected} 
    // id='category'  
    //   >
    //     {(item) => (
    //       <Dropdown.Item 
       
    //         key={item?.key}          
    //       >
    //         {item?.name}
    //       </Dropdown.Item>
    //     )}
    //   </Dropdown.Menu>
    // </Dropdown>
    )}
    {/* Display */}
    {props?.error && (
      <div style={{ color: "red", marginTop: ".5rem" }}>{props?.error}</div>
    )}
  </>





  //   <div>             
  //    {loading? <Loading size="md"/>:appErr || serverErr ? <Text  color="error">{serverErr}-{appErr}</Text>:categoryList===0?<Text  color="error">No category Found</Text>:              

//}</div>
  )
}

export default CategorySelector