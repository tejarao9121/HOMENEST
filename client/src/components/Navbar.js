import React,{useContext}from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { LoginContext } from '../contexts/LoginContext';



const Navbar = () => {

    let [currentUser,err,userLoginStatus,loginUser,logutUser]= useContext(LoginContext);



  return (
    <div className='p'>
        <ul className='list-inline m-3 p-2'>

        
       
           

          {userLoginStatus===false?
          <div>
            <li className='list-inline-item x'>
                <Link className='x m-3'to='/'>Home</Link>
            </li >
        
        <li className='list-inline-item x'>
                <Link className='x m-3' to='/Login'>Login</Link>
                
            </li>

        <li className='list-inline-item x '>
        <Link className='x m-3' to='/Register'>Register</Link>
        </li>
        <li className='list-inline-item x '>
                <Link className='x m-3' to='/Help'>Help</Link>
            </li>
        </div>

            :
            <div>
               <li className='list-inline-item x'>
                <Link className='x m-3'to='/'>Home</Link>
            </li >

             <li className='list-inline-item x'>
             <Link className='x m-3' to='/Login'  onClick={logutUser}>Logout</Link>
  </li >
  <li className='list-inline-item x '>
                <Link className='x m-3' to='/Help'>Help</Link>
            </li>
  
  </div>}


           
            
          
          
        </ul>
      
      
    </div>
  )
}

export default Navbar;