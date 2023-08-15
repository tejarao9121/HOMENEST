import React ,{useState} from 'react'
import { LoginContext } from './LoginContext';
import axios from 'axios'




function UserLoginStore({children}) {
    let [currentUser,setCurrentUser]=useState();

    let [err,setErr]=useState();

    let [userLoginStatus,setUserLoginStatus]=useState(false)

  



    const loginUser=(userobj)=>{
        let f=async()=>{

        let response= await axios.post('http://localhost:4000/user-api/Login',userobj)
        let data=response.data;
        if (data.message==="success"){

              setCurrentUser({...data.user})
              setErr("")

               setUserLoginStatus(true);
              localStorage.setItem("token",data.token);
}
        else{
         
            setErr(data.message)

        }
        
        

        }



        f();
      
    }
    const logutUser=()=>{

      localStorage.clear();


      setUserLoginStatus(false);
      



        
    }





  return (
    <LoginContext.Provider value={[currentUser,err,userLoginStatus,loginUser,logutUser]}>
        {children}


    </LoginContext.Provider>
  )
}

export default UserLoginStore;