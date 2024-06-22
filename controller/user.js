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

//exportar aciones
module.exports = {
    pruebaUser
}