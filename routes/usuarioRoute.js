//#region CONFIGURACION DE MIDDLEWARE PARA RUTAS
'use strict'

//Cargar modulo de express para poder usar las rutas de express
var express = require('express');

const { verificarMiToken } = require('../middlewares/autenticacion');
const {logDoc} = require('../middlewares/logDoc');
//Cargar controlador
var UsuarioController = require('../controllers/usuarioController');


//Usar el router del express
var router = express.Router();

//Conectar con MultiParty y habilitar la subida de ficheros
var multipart = require('connect-multiparty');

//Middleware para que se ejecute antes que el controlador y configuramos la carpeta destino
var md_upload = multipart({uploadDir:'./upload/usuarios'});
//#endregion

//#region CREACION DE RUTAS DE PRUEBAS
//RUTAS PRUEBAS DE FUNCIONAMIENTO
router.post('/Post-Test', UsuarioController.usuarioTest0);
router.get('/Get-Test', UsuarioController.usuarioTest1);
//#endregion

router.get('/ObtenerTopNUsuarios/:last', [logDoc,verificarMiToken], UsuarioController.getTopNUsuario); // [verificarMiToken, verificarROL]


//#region RUTAS PRODUCTIVAS
//Guardar Usuario
router.post('/Save', UsuarioController.save);
//Obtener Usuario
router.get('/ObtenerUsuarios', UsuarioController.getUsuarios);
//Recibir parametros en la ruta Para obtener el Top N de usuarios
router.get('/ObtenerTopNUsuarios/:last', UsuarioController.getTopNUsuario);



//Encontrar un usuario determinado por Id
router.get('/ObtenerUsuario/:id', UsuarioController.getUsuario);
//Actualizar datos en el registro
router.put('/Actualizar/:id', UsuarioController.update);
//Eliminar un registro
router.delete('/Eliminar/:id', UsuarioController.delete);
//Subir un archivo al servidor
router.post('/Cargar-Imagen/:id?', md_upload, UsuarioController.upload);
//Obtener una imagen guardada
router.get('/Obtener-Imagen/:image', UsuarioController.getImage);
//Busqueda de usuarios
router.get('/Buscar/:descrip', UsuarioController.search);
//#endregion

//#region Exportar modulo para habilitar su uso
module.exports = router;
//#endregion