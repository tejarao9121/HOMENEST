import React from "react";
import {useRouteError} from "react-router-dom";


function Error(){
    let err=useRouteError();
    console.log(err);
    return(
        <div className="text-centre mt-5">
            <h1 className="text-danger">Opps...!</h1>
            <p className="text-danger">Unexperted Error</p>
            <p >{err.statusText}</p>
        </div>
    )
}
export default Error;
