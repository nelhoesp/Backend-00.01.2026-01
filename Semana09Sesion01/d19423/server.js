const express = require("express");
require("dotenv").config();
const {User} = require('./models')

//instancia de express
const app  = express();

// middelware para convertir el body en objeto js
app.use(express.json())

//el puerto desde el .env
const PORT = process.env.PORT || 8080;

//la ruta /
app.get('/',(req,res)=>{
    res.status(200).send({ok:200})
})

let arrClientes = [];

arrClientes.push({
    nombre:"Roberto",
    apellido: "Pineda"
})

// el get de la ruta de clientes
app.get('/clientes',(req,res)=>{
    res.send(arrClientes)
})

// el post de la ruta de clientes
app.post("/clientes",(req,res)=>{
    let body = req.body;
    arrClientes.push(body);
    res.send(arrClientes)

})


app.post('/user',async (req,res)=>{
    try {
        let user = req.body;
        let respuesta = await User.create(user);
        res.status(201).send(respuesta);
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/user',async (req,res)=>{ 
    try {
        let respuesta = await User.findAll();
        if(respuesta.lenght == 0){
            res.status(404).send({error: "No hay registros"})
        }else{
            res.status(200).send(respuesta);
        }

    } catch (error) {
        res.status(500).send(error);
    }
})

app.get('/user/:id',async (req,res)=>{ 
    try {
        let id = req.params.id;
        let respuesta = await User.findByPk(id);

        console.log(typeof(respuesta))
        console.log(respuesta)
        if(respuesta!==null){
            res.status(200).send(respuesta);
        }
        else{
             res.status(404).send({error: "No hay registros"})
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

app.put('/user/:id',async (req,res)=>{ 
    try {
        let id = req.params.id;

        let body = req.body;

        let respuesta = await User.update(body,{
            where:{
                id: id
            }
        });

        console.log(typeof(respuesta))
        console.log(respuesta)
        if(respuesta!==null){
            res.status(200).send(respuesta);
        }
        else{
             res.status(404).send({error: "No hay registros"})
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

app.delete('/user/:id',async (req,res)=>{ 
    try {
        let id = req.params.id;

        

        let respuesta = await User.destroy({
            where:{
                id: id
            }
        });

        console.log(typeof(respuesta))
        console.log(respuesta)
        if(respuesta!==null){
            res.status(200).send(respuesta);
        }
        else{
             res.status(404).send({error: "No hay registros"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})


app.get('/user/email/:email',async (req,res)=>{ 
    let email = req.params.email;
    let respuesta = await User.findOne({
        where: {
            email: email
        }
    });
    res.status(200).send(respuesta);
})


app.listen(PORT, ()=>{
    console.log(`Inicio del servidor en ${PORT}`)
})