const mongoose = require("mongoose");

const conection = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/mi_redSocial");
        console.log("Conectado correctamente a la bd: mi_redSocial");

    }catch(error){
        console.log(error);
        throw new Error("No se a podido conectar a la base de datos");
    }
}

module.exports = conection;
