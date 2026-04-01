
const express = require('express');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100
}
);

const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHandler');
const TicketRoute = require('./routes/ticket.route')
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(limiter);
app.use(errorHandler);



app.get('/',(req,res)=>{
    res.send({message:true})
})
app.use('/api/tickets',TicketRoute);

module.exports = app;

