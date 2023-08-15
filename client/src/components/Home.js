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
      
       let response= await axios.post("http://localhost:4000/product-api/Cart1",userObj)
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

      
        <h1 className='mt-5'>Welcome to my app</h1>
        <img className=" m" src="https://img.freepik.com/free-vector/concept-landing-page-house-searching_52683-25080.jpg?size=626&ext=jpg&ga=GA1.2.1691357746.1674371683&semt=ais"></img>
       
        





        <form className='container-fluid' onSubmit={handleSubmit(addUser)}>
          
          <div  className='mt-5'>
            <h2 className='text-success'>Select the type here</h2>
          <input className=' m-2'type="radio" id="plot" name="type" value="plot"   {...register("type", { required: true })}/>
         <label htmlFor="plot">Plot</label>
         <input className=' m-2' type="radio" id="rent" name="type" value="rent"    {...register("type", { required: true })}/>
         <label htmlFor="rent">Rent</label>
          </div>
        <div className="form-group">
          <input type="text" id='location' className="form-control rounded mt-5" placeholder="Search for location"  {...register("location", { required: true })}/>
          <button type="submit" className="btn btn-danger mt-4">search</button>
          
          
        </div>
        </form>
              


        <div   className='f'>
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
          }) :<div className='k'><h1 className='mt-5 t'> Empty</h1></div>
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
