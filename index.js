const express = require('express')
const {dbConection} = require('./database/config')
const cors = require('cors')
require('dotenv').config()
console.log(process.env)
/* Crear el servidor de Express*/

const app = express()

/* Base de datos */

dbConection()

/*CORS */

app.use(cors());

/* Rutas Publicas*/

app.use(express.static('public'));

/* Lectura y parseo del body */

app.use(express.json())

/* rutas */

/* RUTAS AUTH */
app.use('/apis/auth', require('./routers/auth'))

/*RUTAS NOTAS */
app.use('/apis/journal', require('./routers/journal'))

/* app.get('/', (req, res ) =>{
    res.json({
        ok: true
    })
}) */

/* Escuchar peticiones */

app.listen( process.env.PORT, () =>{

  console.log(`servidor corriendo en puerto ${process.env.PORT}`);

})