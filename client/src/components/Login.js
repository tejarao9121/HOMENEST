import React,{useState,useContext,useEffect} from 'react'
import { useForm, } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { LoginContext } from '../contexts/LoginContext';


function Login() {


  let [currentUser,err,userLoginStatus,loginUser,logutUser]= useContext(LoginContext);



  let { register, handleSubmit, formState: { errors } } = useForm();



  const addUser = (userObj) => {
    console.log(userObj);
    
    loginUser(userObj)
  }


  const navigate=useNavigate();

  useEffect(()=>{
    if(userLoginStatus==true){
      console.log(err)
      navigate('/UserProfile')

    }
 },[userLoginStatus])
  

  
  return (
    <div>
         <h1 className='mt-3'>Login</h1>
         { err!=0 && (
        <p className='display-5 text-danger text-centre'>{err}</p>
         )}   
      
    <div className='container'>
      {/* {err!=undefined&&err.length!=0&&<p>Some Error</p>} */}
         {/* { err!=0 && (
        <p className='display-3 text-danger text-centre'>{err}</p>
         )}   
       */}
      <div>
      

      

      {/*<form onSubmit={handleSubmit(addUser)}>
        <div className="form-group text-start">
          <label htmlFor="username" className='mt-3 t'>Username:</label>
          <input type="text" id='username' className="form-control mt-2" placeholder="Enter username" {...register("username", { required: true })}></input>

        </div>
        <div className="form-group mt-3 text-start">
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control mt-2" id="password" placeholder="Enter password" {...register("password", { required: true })}></input>
        </div>

        <input type='submit' className="btn btn-primary mt-4" value='login' ></input>
        </form>*/}
      </div>



      <div className="container">
      
	<div className="screen">
    
		<div className="screen__content">
           
			<form className="login"  onSubmit={handleSubmit(addUser)}>
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" className="login__input" placeholder="User name / Email"   {...register("username", { required: true })}/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" placeholder="Password"    {...register("password", { required: true })}/>
				</div>
				<button className="button login__submit ">
					<span className="button__text  ">LogIn</span>
					<i className="button__icon fas fa-chevron-right "></i>
				</button>				
			</form>
			
		</div>
		 <div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		 
	</div>
</div>
    </div>

    </div>
  )
}

export default Login;