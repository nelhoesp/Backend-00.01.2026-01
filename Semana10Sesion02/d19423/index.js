console.log("Inicio de la aplicacion");
require("dotenv").config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const {alumnoRouter} = require('./alumno.router')

const app = express();

app.use(express.json());
app.use('/alumnos',alumnoRouter)

app.get('/',(req,res)=>{
    res.send({message: "online"})
})

app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})