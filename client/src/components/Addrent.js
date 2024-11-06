import React,{useState} from "react";
import { useForm } from "react-hook-form"
import {useNavigate} from "react-router-dom"
import  { useContext } from 'react'
import { LoginContext } from '../contexts/LoginContext'
import axios from 'axios';


function Addrent(){
  let [erro,setErr]=useState("")

    const navigate =useNavigate()


    let { register, handleSubmit, formState: { errors } } = useForm();

    let [currentUser, err, userLoginStatus, loginUser, logutUser] = useContext(LoginContext)

    const addUser = (userObj) => {

      const result = {
        type:"rent",
        username:currentUser.username,
        newObj:userObj
         }



      let f=async()=>{
        console.log(result)
        
        let response= await axios.post("https://homenest-wrz6.onrender.com/product-api/Addrent",result)
        let data=response.data
        console.log(data,"in addrent...")


         if(data.message==="rent added"){
        navigate('/UserProfile/AddedItems');
          }
          else{
             setErr(data.message)
          }

  
        
    
    }
      f()
  
    }
    
    return(
       <div>
        <h1>Add House Details for rent</h1>

        <div className="container w-50 ">

        <form onSubmit={handleSubmit(addUser)} className="w-100">
          

          <div className="form-group text-start ">
           <label htmlFor="name" className=''>Enter Name:</label>
           <input type="text" className="form-control mt-2" id='name' {...register("name", { required: true })}></input>
           

         </div>
         <div className="form-group mt-3 text-start">
           <label htmlFor="PhNo">Enter Mobile Number:</label>
           <input type="number" className="form-control mt-2" id="PhNo" name='pHNo' placeholder="Enter Number" {...register("PhNo", { required: true })}></input>
         </div>
        
         <div className="form-group mt-3 text-start">
           <label htmlFor="Type">Enter Type:</label>
           <input type="text" className="form-control mt-2" id="Type" name='Type'  {...register("Type", { required: true })}></input>
         </div>
         <div className="form-group mt-3 text-start">
           <label htmlFor='Price'>Enter Price:</label>
           <input type="number" className="form-control mt-2" id="Price" placeholder="" name='Price'{...register("Price", { required: true })}></input>
         </div>

         <div className="form-group mt-3 text-start">
           <label htmlFor='Address'>Enter Address:</label>
           <input type="text" className="form-control mt-2" id="Address" placeholder="" name='Address'{...register("Address", { required: true })}></input>
         </div>
        
           


         <input type="submit" className="btn btn-primary mt-5 ps-4 pe-4" value="Add" /> 
       </form>

        </div>
        
       </div>
    )
}
export default Addrent;