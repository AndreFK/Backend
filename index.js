//Habilitar modo estricto permite ejecutar funcionalidades nuevas de ECMAScript5, corrige errores previos y permite optimización de código
'use strict'
var mongoose = require('mongoose');
//Cargar modulo del servidor
var app = require('./app');
//Configurar el puerto que utilizará la aplicación
var nPort = 3721;
//Nombre de la Base de datos
var sBaseDeDatos = 'ProyectoDeClase';
//Desactiva la forma antigua de MongoDB
mongoose.set('useFindAndModify',false);
//Habilidar la promesa para evitar problemas al conectarnos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/'+sBaseDeDatos, {useNewUrlParser:true, useUnifiedTopology: true} ).then( ()=> {
    console.log(`La Conexión a Base de Datos: ${sBaseDeDatos} es Correcta!!`);
    //CREAR SERVIDOR Y ESCUCHAR PETICIONES EN HTTP
    app.listen(nPort, ()=>{
        console.log('El Servidor esta corriendo correctamente en: http://localhost:'+nPort);
    } )} );
