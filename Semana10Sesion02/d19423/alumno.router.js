const alumnoRouter = require("express").Router();
const {ObjectId} = require("mongodb")

const {getDB} = require("./db");
const collection = 'alumnos'

alumnoRouter.get('/', async(req,res)=>{
    try {
        const db = await getDB();
        let registros = await db.collection(collection).find().toArray();
        res.send({data:registros});
    } catch (error) {
        res.status(500).send({message:error})   
    }

})

alumnoRouter.get('/:id', async(req,res)=>{
    try {
        const db = await getDB();
        const id = req.params.id;
        let registros = await db.collection(collection).find({_id: new ObjectId(id)}).toArray();
        res.send({data:registros});
    } catch (error) {
        res.status(500).send({message:error})   
    }

})

alumnoRouter.post('/', async(req,res)=>{
try {
    const db = await getDB();
    const data = req.body;
    if(Array.isArray(data)){
        db.collection(collection).insertMany(data);
    }else{
        db.collection(collection).insertOne(data);
    }
    res.status(201).send({message: "Guardado con exito"})

} catch (error) {
     res.status(500).send({message:error})   
}
})

alumnoRouter.put('/:id', async(req,res)=>{
try {
    const db = await getDB();
    const id = req.params.id;
    const {nombre,apellido} = req.body;
    
    let registros = db.collection(collection).findOneAndUpdate(
        {_id: new ObjectId(id)},
        {$set:{
            nombre, apellido
        }},
    {returnDocument: true});
   
    res.status(201).send({data: registros.value})

} catch (error) {
     res.status(500).send({message:error})   
}
})

alumnoRouter.delete('/:id', async(req,res)=>{
try {
    const db = await getDB();
    const id = req.params.id;
    const {nombre,apellido} = req.body;
    
    let registros = db.collection(collection).findOneAndDelete(
        {_id: new ObjectId(id)}
    );
   
    res.status(201).send({message: "Borrado"})

} catch (error) {
     res.status(500).send({message:error})   
}
})


module.exports = {alumnoRouter}