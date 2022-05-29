//Inyección de la dependencia mongoose
const mongoose = require('mongoose');

//Inyección de la dependencia express
const express = require('express');

//Inyección de la dependencia del router de persons
const personsRoutes = require('./routes/person');

//Generamos App de express, setteo un valor de mongoose
mongoose.Promise = global.Promise;
const app = express();

//Configuración del view engine, agregamos router y urlencoder (parsear body en peticiones POST)
app.set('view engine', 'ejs');
app.use(express.urlencoded( {extended:false} ));
app.use(personsRoutes);

//Conexión a la base de datos
mongoose.connect(
    `mongodb+srv://joseocxmpo:Jose2001@cluster0.yuggb.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected succesfully");
});

//Levantar servidor
app.listen(3000);