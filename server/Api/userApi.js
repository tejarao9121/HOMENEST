
const exp=require("express");
const userApp=exp.Router();


const nodemailer= require("nodemailer");
const {google} = require('googleapi');
const config = require('./confi');


const bcryptjs=require('bcryptjs');
const jwt=require("jsonwebtoken")

const expressAsyncHandler=require('express-async-handler');


const VerifyToken=require("./VerifyToken")






userApp.use(exp.json());
userApp.post("/Register",expressAsyncHandler(async(request,response)=>{
    const usercollection=request.app.get('usercollection');
    const productcollection=request.app.get('productcollection');


    const newUser=request.body;
    
    const p= await usercollection.findOne({username:newUser.username})
    const q= await usercollection.findOne({email:newUser.email})

    if(p===null && q===null){
    let hashedPass=await bcryptjs.hash(newUser.password,6)
    newUser.password=hashedPass
    // users.push(newUser);

    await usercollection.insertOne(newUser)

    let usernam=newUser.username
    const mailId=newUser.email;
      //creating product arry of user
      const myRents={
        username:usernam,
       addedItems:[]
    }

    await productcollection.insertOne(myRents)




    //sending mail to user
     console.log("before sending ",mailId);


// const clid='85122114347-epcuhkl6h5u5ifeqnpllgftud68gu8ek.apps.googleusercontent.com'
// const clset='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'

// const redirect_uri='https://developers.google.com/oauthplayground';
// const refreshToken='1//04o29f8BGuk7yCgYIARAAGAQSNwF-L9IreixSGT-9epXoW8mWMBw9MMQJyXN0uOHef4_2aRUGmhrFiFYQl76IIIjGvU_ss2eyQPs';


//  const oAuth2Client= new google.auth.OAuth2( config.clid,config.clset)

//  oAuth2Client.setCredentials({ refresh_token : config.refreshToken})

//  async function send_mail(recipient){

//     console.log("hello")


//        const accessToken = await oAuth2Client.getAccessToken()

//         const transport = nodemailer.createTransport({
//             service : 'gmail',
//             auth :{
//                  type : 'OAuth2',
//                  user : 'tejarao9121@gmail.com',
//                  clientId : config.clid,
//                  clientSecret : config.clset,
//                  refreshToken : config.refreshToken,
//                  accessToken : accessToken
//              }

//          })

//         const mailOptions={
//             from : "tejarao9121@gmail.com",
//             to : recipient,
//             subject : "Sending email with recat",
//             html :'<h1>You have Successfully registerd</h1>'
//         }

//          const result = await transport.sendMail(mailOptions,function(error,result){
//             if(error){
//                 console.log(error)
//             } else{
//                 console.log("success",result)

//             }
//          })

        


//  }

// send_mail(mailId)




   





    //creating product arry of user

    

    response.status(201).send({message:"user created"})
    } else if(p===null && q!=null){
        response.status(200).send({message:"email already exist"})
    }
    else if(p!=null && q===null){
        response.status(200).send({message:"username already exist"})

    }
    else{
        response.status(200).send({message:"username and email already exist"})

    }


}))

userApp.use(exp.json());

userApp.post("/Login",expressAsyncHandler(async(request,response)=>{
    const usercollection=request.app.get('usercollection');


    const logiUser=request.body;
 

    const userOfDb= await usercollection.findOne({username:logiUser.username})
   
    
    if(userOfDb===null){
        response.status(200).send({message:"invalid username"})
    }
    else
    {
        let isEqual=await bcryptjs.compare(logiUser.password,userOfDb.password)
         if(isEqual===false){
            response.status(200).send({message:"invalid password"})
         }
         else{
              let signedToken=jwt.sign({username:userOfDb.username},'abcdef',{expiresIn:4000})

              response.status(200).send({message:"success",token:signedToken,user:logiUser})



         }
    }
   

    

}))









module.exports=userApp;