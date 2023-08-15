import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import { Outlet } from "react-router-dom";



function UserProfile(){


    
  let [currentUser,err,userLoginStatus,loginUser,logutUser]= useContext(LoginContext);
   
    return(
       <div>
        <p>Hello Welcome </p>
        <p>This will help you have better business by selling your plots or providing customers to your place</p>

        <ul className='list-inline m-3 p-2'>

    <li className='list-inline-item x'>
        <Link className='x m-3'to='Addplot'>Addplot</Link>
    </li >
    <li className='list-inline-item x '>
        <Link className='x m-3'to='Addrent'>Addrent</Link>
    </li >
    <li className='list-inline-item x'>
        <Link className='x m-3'to='AddedItems'>AddedItems</Link>
    </li >
    <li className='list-inline-item x'>
        <Link className='x m-3'to='MapPrc'>Map</Link>
    </li >
    </ul>
    <Outlet/>

       </div>
    )
}
export default UserProfile;