const exp=require("express");
const productApp=exp.Router();

const expressAsyncHandler=require('express-async-handler');




//adding rent


productApp.use(exp.json());
productApp.post("/Addrent",expressAsyncHandler(async(request,response)=>{


    const productcollection=request.app.get('productcollection');
    const newRent=request.body;


    console.log("in post",newRent);
    const cartCollection=request.app.get('cartCollection');

    
    //adding rent to the cart means cart api


    let myRentsInCart=await cartCollection.findOne({type:newRent.type})
    if(myRentsInCart==null){
        const myCart={
            type:"rent",
            addedProduct:[]
        }

       
        await cartCollection.insertOne(myCart)
      
    }

    let myRent=await cartCollection.findOne({type:newRent.type})
    console.log(myRent);
    if (myRent!=null){

        const addedProduct=myRent.addedProduct
        
        //new rent
       const userdata=newRent.newObj

        addedProduct.push(userdata)
        console.log("added product in cart api",addedProduct);

        

        await cartCollection.updateOne({type:newRent.type},{$set:{addedProduct:addedProduct}})
    
        

    }
    
    


  //adding rent to the user acnt means product api



    let myRents=await productcollection.findOne({username:newRent.username})
    if(myRents!=null){
        //existing rents
        const addedItems=myRents.addedItems
        
        //new rent
       const userdata=newRent.newObj

        
        addedItems.push(userdata)
        console.log("added users",addedItems);

        

        await productcollection.updateOne({username:newRent.username},{$set:{addedItems:addedItems}})
    
        response.status(200).send({message:"rent added"})

    }
    else{
    response.status(200).send({message:"erro..."})
    }
    
}))



//adding plot


productApp.use(exp.json());
productApp.post("/Addplot",expressAsyncHandler(async(request,response)=>{
    const productcollection=request.app.get('productcollection');
    const newPlot=request.body;


    console.log("in post",newPlot);
    const cartCollection=request.app.get('cartCollection');

    
    //adding plot to the cart means cart api


    let myPlotsInCart=await cartCollection.findOne({type:newPlot.type})
    if(myPlotsInCart==null){
        const myCart={
            type:"plot",
            addedProduct:[]
        }

       
        await cartCollection.insertOne(myCart)
      
    }


    let myPlot=await cartCollection.findOne({type:newPlot.type})
    console.log(myPlot);
    if (myPlot!=null){

        const addedProduct=myPlot.addedProduct
        
        //new plot
       const userdata=newPlot.newObj

        addedProduct.push(userdata)
        console.log("added product in cart api",addedProduct);

        

        await cartCollection.updateOne({type:newPlot.type},{$set:{addedProduct:addedProduct}})
    
        

    }









    
    let myPlots=await productcollection.findOne({username:newPlot.username})  
    if(myPlots!=null){
        //existing rents
        const addedItems=myPlots.addedItems
        //new rent
       const userdata=newPlot.newObj
        
        addedItems.push(userdata)
        console.log("added users",addedItems);
        await productcollection.updateOne({username:newPlot.username},{$set:{addedItems:addedItems}})
    
        response.status(200).send({message:"plot added"})

    }
    else{
    response.status(200).send({message:"erro..."})
    }
    
}))



//sending products of user to display in addeditems

productApp.use(exp.json());
productApp.post("/AddedItems",expressAsyncHandler(async(request,response)=>{

    const productcollection=request.app.get('productcollection');

    const newUser=request.body;
    

    let products=await productcollection.find({username:newUser.username}).toArray();
    
     
    response.status(200).send({message:"user list",user:products});
}))


//deleting the product

productApp.use(exp.json())
productApp.post("/AddedItems1",expressAsyncHandler(async(request,response)=>{

    const productcollection=request.app.get('productcollection');
    const cartCollection=request.app.get('cartCollection');
    let newUser = request.body;
   console.log("list in delete",newUser);

   let addedItem=await productcollection.find({username:newUser.username}).toArray();
   let addedPlot=await cartCollection.findOne({type:'plot'})
   let addedRent=await cartCollection.findOne({type:'rent'})
 
   //deleting in cart
   let presentPlot=addedPlot.addedProduct
   let presentRent=addedRent.addedProduct
   console.log("present plots in cart",presentPlot);
   console.log("present rents in cart",presentRent);
   presentPlot=presentPlot.filter(per=>(per.name!= newUser.deleteItem.name || per.phNo!=newUser.deleteItem.phNo || per.Address!=newUser.deleteItem.Address))
   
   presentRent=presentRent.filter(per=>(per.name!= newUser.deleteItem.name || per.phNo!=newUser.deleteItem.phNo || per.Address!=newUser.deleteItem.Address))
   

   console.log("after deleting in cart of rent",presentRent)
   console.log("after deleting in cart of plot",presentPlot)


   await cartCollection.updateOne({type:'plot'},{$set:{addedProduct:presentPlot}})
   await cartCollection.updateOne({type:'rent'},{$set:{addedProduct:presentRent}})




   console.log("the userd",addedItem)
   p=addedItem[0].addedItems
   console.log("tod ele",p)
  p=p.filter(per=>(per.name!= newUser.deleteItem.name || per.phNo!=newUser.deleteItem.phNo || per.Address!=newUser.deleteItem.Address))
   
   console.log("aft deleting ",p);
   
    await productcollection.updateOne({username:newUser.username},{$set:{addedItems:p}})
    let finalUsers=await productcollection.find({username:newUser.username}).toArray();
    console.log("After updatoing",finalUsers)
   
   response.status(200).send({message:"user deleted",userData:finalUsers})


}))






module.exports=productApp;