const Ticket = require('../models/ticket.model');

function httpError(status, message){
    const err = new Error(message);
    err.status = status;
    return err;
}

exports.createTicket = async(req,res)=>{
    const ticket = await Ticket.create(req.body);
    res.status(201).json(ticket);
}