'use strict';

const validator=(req,res,next)=>{
    
    if (req.headers['x-admin'] == 1){
        console.log("admin login");
        next();
    }
    else{
    
        res.send("unauthorized admin");
    }
}

module.exports = validator ;