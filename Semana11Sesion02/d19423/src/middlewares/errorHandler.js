const mongoose = require('mongoose');

module.exports = function errorHandler(err,req,res,next){
    if(err instanceof mongoose.Error.CastError){
        return res.status(400).json({message: "Invalid ID format"})
    }
    if(err instanceof mongoose.Error.ValidationError){
         return res.status(400).json({message: "Validation error"})
    }
    if(err.status && err.message){
        return res.status(err.status).json({message: err.message})
    }
    console.error(err);
    res.status(500).json({message: "Internal Server Error"});
}