const exp =require("express");
const app=exp()

const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log("server is porting");
})

const cors = require('cors');


const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});


const mclient=require('mongodb').MongoClient;
require('dotenv').config();

mclient.connect(process.env.MONGO_URI )
.then(dbRef=>{
   
    let dbobj=dbRef.db('EcomAppdb')
    
    let usercollection=dbobj.collection("usercollection")
    let productcollection=dbobj.collection("productcollection")
    let cartCollection=dbobj.collection("cartCollection");

    app.set("usercollection",usercollection)
    app.set("productcollection",productcollection)
    app.set("cartCollection",cartCollection)
   
    console.log("connected successfully to db")
    
})
.catch(err=>console.log("database connection err is",err))

app.get('/check',(req,res)=>{
    res.send({message:"checking...."})
})

const userApp=require("./Api/userApi");
const productApp=require("./Api/productApi");
const cartApp=require("./Api/cartApi");

app.use("/user-api",userApp);
app.use("/product-api",productApp);
app.use("/product-api",cartApp);







const invaildPathHandlingMiddleware=(request,response,next)=>{
    response.send({message:"invalid path"});

};
app.use(invaildPathHandlingMiddleware);


const errHandler=(error,request,response,next)=>{
    response.send({"error-message: ":error.message})

}
app.use(errHandler);
