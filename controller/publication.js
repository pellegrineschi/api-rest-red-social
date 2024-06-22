//acciones de prueba
const pruebaPublication = async (req, res)=>{
    try{
        return res.status(200).send({
            message:"Mensaje enviado desde: controller/publication.js"
        })
    }catch(error){
        console.log(error);
    }
}

//exportar aciones
module.exports = {
    pruebaPublication
}