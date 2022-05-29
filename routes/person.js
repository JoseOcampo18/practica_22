//Inyección de la dependencia Express
const express = require('express');

//Generar intancia del router
const router = express.Router();

//Inyección de la dependencia de Mongoose
const mongoose = require('../node_modules/mongoose');

//Inyección de la dependencia del modelo "person"
let Person = require('../models/person');

//Ruta "/persons", metodo GET
router.get('/persons', function(req, res, next) {
    Person.find(function (err, persons){
        if (err) return next(err);
        res.render("persons", {'persons': persons});
    })
});

//Ruta "/deletePerson", Elimina persona de la tabla
router.get('/deletePerson/:id', function(req, res, next){
    Person.findByIdAndRemove(req.params.id, req.body, function (err, post){
        if(err) return next(err);
        res.redirect('/persons');
    });
})

//Ruta "/findById/:id", Busca a una persona en la tabala a través de si id
router.get('/findById/:id', function(req, res, next){
    Person.findById(req.params.id, req.body, function(err, person){
        if(err) return next(err);
        res.render('personUpdate', {person});
    })
});

//Ruta "/updatePerson", Actualiza la inforamción de una persona
router.post('/personUpdate', function(req, res, next){
    Person.findByIdAndUpdate(req.body.objId, {
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss}, function(err, post){
            if(err) return next(err);
            res.redirect('/persons')
        });
     });

//Ruta "/person", metodo GET; Renderiza la vista del formulario para enviar los datos
router.get('/person', function (req, res) {
    res.render('./person');
});

//Ruta "/addPerson", metodo POST; para agregar un nuevo dicumento a la coleccíón
router.post('/addPerson', function(req, res) {
    //console.log(req.body);
    const myPerson = new Person({
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss
    });//Crear la entidad
    myPerson.save() //Guardar en la bd
    res.redirect("./persons") //Redirecciona a la vista persons
});

//Ruta "index", metodo GET
router.get('/index', function (req, res){
    res.render('./index');
});

//Exporte de el ruteador
module.exports = router;