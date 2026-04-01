const mongoose = require('mongoose');

const emailRegex = /^\S+@\S+\.\S+$/;

const TicketSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxleng: 80, 
        trim: true 
    },
    description: { 
        type: String, 
        required: true, 
        minlength: 10, 
        maxleng: 500, 
        trim: true 
    },
    status: {
        type: String,
        enum:["open","in_progess","closed"],
        default: "open"
    },
    priority:{
        type: String,
        enum:["low","medium","high"],
        default: "medium"
    },
    customerEmail:{
        type:String,
        required: true,
        lowercase:true,
        trim:true,
        validate:{
            validator:(v)=> emailRegex.test(v),
            message: "Invalid email format"
        }
    },
    tags:{
        type:[String],
        default:[]
    }
}, {timestamps:true});

module.exports= mongoose.model("Ticket", TicketSchema);