//=================================================
// VERIFICAR TOKENS
//=================================================
const jwt = require('jsonwebtoken');
var LogUsuario = require('../models/nModel');


let logDoc = (req,res, next) =>{
    let sToken = req.get('token');
    console.log(sToken);

    jwt.verify(sToken, process.env.SEED_TOKEN, (err,decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                err
            });
        }

        //Ya que en el token enviamos el objeto usuario lo obtenemos mediante decoded
        req.usuarioToken = decoded.usuario;

        //Instanciar Modelo
        log = new LogUsuario();


       //Mapeo de información en campos
       log.usuario = 'hola';
       log.descripcion = "J";

      
       //Guardar En MongoDB
       log.save( (err,logStored)=>{
           if(err || !logStored)
           {
               return res.status(404).send({
                   status: 'error',
                   message:'Error al guardar el registro.'
               })
           }

           //NOTA: SI NO EJECUTA NEXT NO SE EJECUTARA EL METODO SIGUIENTE 
        //QUE EN ESTE CASO SON LAS FUNCIONES DE NUESTRO CONTROLLER
        next();
       } );
        
    });

    
};

module.exports = {logDoc}