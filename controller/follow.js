//acciones de prueba
const pruebaFollow = async (req, res)=>{
    try{
        return res.status(200).send({
            message:"Mensaje enviado desde: controller/follow.js"
        })
    }catch(error){
        console.log(error);
    }
}

//exportar aciones
module.exports = {
    pruebaFollow
}