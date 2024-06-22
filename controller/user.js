//importar dependencias y modulos
const user = require("../model/user");

//acciones de prueba
const pruebaUser = async (req, res)=>{
    try{
        return res.status(200).send({
            message:"Mensaje enviado desde: controller/user.js"
        })
    }catch(error){
        console.log(error);
    }
}

//registro de usuarios
const register = async(req, res)=>{

    //recoger datos de la peticion
    let params = req.body;

    //comprobar que me llegan bien (+validacion)
    if(!params.name || !params.email || !params.password || !params.nick){

        return res.status(400).json({
            status: "error",
            message: "faltan datos por enviar"
        })        
    }

    //crear objeto de usuario
    let userToSave = new user(params);
    
    //control usuarios duplicados
    user.find({
        
    })

    //cifrar contraseñas
    
    //guardar usuario en la bbdd

    //devolver resultado

    try{
        return res.status(200).json({
            message:"accion de registro de usuarios",
            params,
            userToSave
        });

    }catch(error){
        console.log(error);
    }
    
}

//exportar aciones
module.exports ={
    pruebaUser,
    register
} 

