
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let db;

async function getDB() {
    if(!db){
        await client.connect();
        db = client.db(process.env.DB_NAME)
        console.log("Base Conectada")
    }
    return db;
}

async function closeDB() {
    await client.close();
}

module.exports = {db, getDB, closeDB}