import {React} from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form'
import MapPrc from './MapPrc';
import MapContainer from './SearchMap';
import SearchForm from './SearchForm';
import gmail from './GmailVer'
import './Home.css'
import { useState } from 'react';




function Home() {

  let [finalProducts,setfinalProducts]=useState([])


  
  const [location, setLocation] = useState(null);

  let { register, handleSubmit, formState: { errors } } = useForm();

  const addUser = (userObj) => {

    let f=async()=>{
      console.log("before sending in home",userObj)
      
       let response= await axios.post("https://homenest-wrz6.onrender.com/product-api/Cart1",userObj)
       let data=response.data
       console.log(data.user,"in home..")
       const x=data.user
       console.log("after final products  to display",x);
       setfinalProducts(x);

     

  
  }
    f()
    
    
  }

  return (
    <div >

      
        <h1 className='mt-5'>Welcome to my App</h1>
        <img className=" m" src="https://www.chrystopherjames.co.uk/wp-content/uploads/2019/04/HD_PropertyRental_Moment.jpg"></img>
       
        





        <form className='container-fluid' onSubmit={handleSubmit(addUser)}>
          
          <div  className='mt-5'>
            <h2 className='text-success'>Select the type </h2>
          <input className=' m-2'type="radio" id="plot" name="type" value="plot"   {...register("type", { required: true })}/>
         <label htmlFor="plot">Plot</label>
         <input className=' m-2' type="radio" id="rent" name="type" value="rent"    {...register("type", { required: true })}/>
         <label htmlFor="rent">Rent</label>
          </div>
        <div className="form-group s">
          <input type="text" id='location' className="form-control mt-5 n" placeholder="Search for location"  {...register("location", { required: true })}/>
          <button type="submit" className="btn btn-danger mt-4">search</button>
          
          
        </div>
        </form>
              


        <div   className='f container-fluid'>
           { finalProducts.length!=0?
          finalProducts.map((item,index)=>{
            return(
            
               <div className="card  z ">
               <div className="card-body mt-4 text-start ">
              
            <div key={index} >
          {Object.keys(item).map((key) => (
              <div key={key}>
              <h2><b>{key}</b> : {item[key]}</h2>
              
            </div>

              ))}
             
        </div>
  
          
            </div>
            </div>
           
             
            )
          }) :<div className='k'><h1 className='mt-5 t'></h1></div>
          } 
          




</div>

        {/* <div>
      <SearchForm setLocation={setLocation} />
      {location && <MapContainer location={location} />}
    </div>
   */}
       

    
       
     </div>      
  
  
  )
}

export default Home
