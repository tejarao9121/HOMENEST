// import React, { useState } from 'react'
// import { LoginContext } from '../contexts/LoginContext';
// import { useContext } from 'react';
// import axios from 'axios';
// import './AddedItems.css'

// function AddedItems() {


//   let [userAddedData, setuserAddedData] = useState([]);
 

//   let [currentUser, err, userLoginStatus, loginUser, logutUser] = useContext(LoginContext)


//   let f = async () => {

//     const result = {
//       username: currentUser.username
//     }

//     let response = await axios.post("http://localhost:4000/product-api/AddedItems",result)

//     let users = response.data;
//     let m = users.user[0].addedItems;
//     setuserAddedData(m)
//   }
//   f()


//   let onDeleteUser =async(item)=>{
//     const result={
//       username:currentUser.username,
//       deleteItem:item
//     }
//     console.log("sending in cart",result);
    
//     let response = await axios.post("http://localhost:4000/product-api/AddedItems1",result)
//     console.log("final ",response.data)
//     let finalUsers=response.data.userData[0].addedItems;
//     console.log("final ",finalUsers)
//     setuserAddedData(finalUsers)
   
    

//   }




//   return (
    
//         <div className='q'>

//         <div>
//            { (userAddedData || userAddedData.length!=0) ?
//           userAddedData.map((item,index)=>{
//             return(
            
//                <div className="card  z ">
//                <div className="card-body mt-4 text-start ">


              

              
//             <div key={index} >
//           {Object.keys(item).map((key) => (
//               <div key={key}>
//               <h2><b>{key}</b> : {item[key]}</h2>
              
//             </div>

//               ))}
//               <button  onClick={()=>onDeleteUser(item)} className="btn btn-danger  mt-3" >Delete</button>
//         </div>
             
     
//             </div>
//             </div>
           
            
        

             
             
//             )
//           }) :<h1>Users list is Empty</h1>
//           } 




// </div>


//         </div>

//   )
// }

// export default AddedItems



import React, { useState, useEffect } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import { useContext } from 'react';
import axios from 'axios';
import './AddedItems.css';

function AddedItems() {
  let [userAddedData, setuserAddedData] = useState([]);
  let [currentUser] = useContext(LoginContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = { username: currentUser.username };
        let response = await axios.post("https://homenest-wrz6.onrender.com/product-api/AddedItems", result);
        let users = response.data;
        let m = users.user[0].addedItems;
        setuserAddedData(m);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [currentUser]); // Depend on currentUser to run only on component mount or user change

  const onDeleteUser = async (item) => {
    const result = { username: currentUser.username, deleteItem: item };
    try {
      let response = await axios.post("https://homenest-wrz6.onrender.com/product-api/AddedItems1", result);
      let finalUsers = response.data.userData[0].addedItems;
      setuserAddedData(finalUsers);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="q">
      <div>
        {(userAddedData && userAddedData.length !== 0) ?
          userAddedData.map((item, index) => (
            <div className="card z" key={index}>
              <div className="card-body mt-4 text-start">
                <div>
                  {Object.keys(item).map((key) => (
                    <div key={key}>
                      <h2><b>{key}</b>: {item[key]}</h2>
                    </div>
                  ))}
                  <button onClick={() => onDeleteUser(item)} className="btn btn-danger mt-3">Delete</button>
                </div>
              </div>
            </div>
          )) :
          <h1>Users list is Empty</h1>
        }
      </div>
    </div>
  );
}

export default AddedItems;
