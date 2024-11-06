import React, { useState } from 'react'
import './Register.css'
import { useForm } from "react-hook-form"
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import emailjs from '@emailjs/browser';




function Register() {
  let [err,setErr]=useState("")

  //navi
  const navigate =useNavigate()
  
  let { register, handleSubmit, formState: { errors } } = useForm();

  const sendEmail = (e) => {
    e.preventDefault();

   
    console.log("deta;is of form",e.target);

    const userObj={
      email:e.target.email.value,
      username:e.target.username.value,
      password:e.target.password.value,
      DOB:e.target.DOB.value
    }
   
      

   console.log(" before in the register",userObj)

    
   let f=async()=>{

     console.log(userObj)
     
     let response= await axios.post("https://homenest-wrz6.onrender.com/user-api/Register",userObj)
     let data=response.data
     console.log(data,"in register...")
     
     

     if(data.message==="user created"){


      
    emailjs.sendForm('service_j1yifah','template_i1102b3',e.target,'N8P7n2MYW_DwUHqQA')
    .then((result) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);

    });

      
       navigate('/Login');
       
     }
     else{
       setErr(data.message)
     }

 
 }
  f()

  

    // emailjs.sendForm('service_j1yifah','template_i1102b3',e.target,'N8P7n2MYW_DwUHqQA')
    //   .then((result) => {
    //     console.log(result.text);
    //   }, (error) => {
    //     console.log(error.text);

    //   });
  };


  

   

 
  

  return (
    <div>
      <h1>Register</h1>
      { ((err==="username already exist" || err==="username and email already exist") || err==="email already exist")  && (
        <p className='display-3 text-danger text-centre'>{err}</p>
      )}
      <div className='container'>
      
     
        

        <form onSubmit={sendEmail} className='w-75'  >
          
          
           <div className="form-group text-start ">
            <label htmlFor="email" className='mt-2 '>Enter Email:</label>
            <input type="email" className="form-control mt-2" id='email'   {...register("email", { required: true })}></input>
           {/* {err.name?.type === "required" && (
              <p className='text-danger fw-blod fs-5'>Email is required</p>
            )} */}

          </div>
          <div className="form-group mt-3 text-start">
            <label htmlFor="username">Username:</label>
            <input type="text" className="form-control mt-2" id="username" name='username' placeholder="username " {...register("username", { required: true })}></input>
          </div>
         
          <div className="form-group mt-3 text-start">
            <label htmlFor="Password">Enter Password:</label>
            <input type="password" className="form-control mt-2" id="Password" name='password'  {...register("password", { required: true })}></input>
          </div>
          <div className="form-group mt-3 text-start">
            <label htmlFor='DOB'>DOB</label>
            <input type="date" className="form-control mt-2" id="DOB" placeholder="DateOfBirth" name='DOB'{...register("DOB", { required: true })}></input>
          </div>

         
            


          <input type="submit" className="btn btn-primary mt-3" value="register" /> 
          </form>
         
        












      </div>








    </div>
  )
}

export default Register