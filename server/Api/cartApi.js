const exp=require("express");
const cartApp=exp.Router();

const expressAsyncHandler=require('express-async-handler');


cartApp.use(exp.json());
cartApp.post("/Cart1",expressAsyncHandler(async(request,response)=>{

    const cartCollection=request.app.get('cartCollection');

    const newData=request.body;
    

    let products=await cartCollection.find({type:newData.type}).toArray();

    
     console.log("in cart api",products);
     const m=products[0].addedProduct
     console.log("xyx",m)
     z=[]
     
     for(i=0;i<m.length;i++){
        const string=m[i].Address
        const substring = newData.location;
        
        console.log(m[i]);
        if (string.includes(substring)){
            z.push(m[i])

        }


     }
     console.log("after pushing",z)


    response.status(200).send({message:"user list",user:z});
}))







module.exports=cartApp;