console.log("Inicio de la aplicacion");
//cargar la configuracion que esta en el archivo .env
require('dotenv').config();
const {Client} =  require('pg');

console.log(process.env.DB_NAME);

const cliente = new Client(
    {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT
    }
);

async function conectar() {
    await cliente.connect();
    console.log("Se conecto");
    let id = 3
    let sql = `SELECT * FROM public.products
where category_id = ${id}
ORDER BY product_id ASC `
    const respuesta = await cliente.query(sql);
    console.log(respuesta.rows);
    await cliente.end();
}

conectar();