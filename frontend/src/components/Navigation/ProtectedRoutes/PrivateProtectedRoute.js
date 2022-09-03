import React,{ FC } from 'react'
import { useSelector } from 'react-redux'
import{Route,Navigate} from 'react-router-dom'



//chech if user is login


const PrivateProtectedRoute = ({component:Component, ...rest}) => {

    const user=useSelector(state=>state?.users);
const {userAuth} = user;
  return (
    <Route {...rest} render={()=> userAuth ? <Component {...rest}/>:<Navigate to='/login'/>}/>
  );
};
// const PrivateProtectedRoute: FC<React.ComponentProps<typeof Route>> = props => {
//         const user=useSelector(state=>state?.users);
// const {userAuth} = user;
    
 
//     return (
//        <Route {...props}>{userAuth ? props.children : <LoginPage/>}</Route>
//     );
//  };

export default PrivateProtectedRoute;