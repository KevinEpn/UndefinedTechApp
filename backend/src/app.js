const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const { config } = require('dotenv');
config()



const scoreRoutes = require('./routes/score.routes');

// Express para los middlewares
const app = express();
app.use(bodyParser.json());

// Habilitar CORS
// app.use(cors({
//     origin: 'http://locahost:4200/', // Permitir solicitudes desde este dominio
//     methods: ['GET','POST','PUT','DELETE'], // Métodos que se permiten
//     allowedHeaders: ['Content-Type', 'Authorization'] // Cabeceras permitidas
// }));


// Conexión de la BD
connectDB();
// mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME })
const db = mongoose.connection;

app.use('/scores', scoreRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})