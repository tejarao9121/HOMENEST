const VerifyToken=(request,response,next)=>{

    let beaererToken=request.headers.authorization;

    if(beaererToken==undefined){
        response.send({message:"unauthorized request"})
    }
    else{
        const token=beaererToken.split(" ")[1]
        try{

        jwt.verify(token,'abcdef')
        next()
        }
        catch(err){
            response.send({message:err});
        }
    }




}



module.exports=VerifyToken