//importar dependencias
const conection = require("./database/conection");
const express = require("express");
const cors =require("cors");

//mensaje bienvenida
console.log("API NODE para red social arrancada");

// conexion a bbdd
conection();

// crear servidor node
const app = express();
const puerto = 3900; 

// configurar cors
app.use(cors());

// convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// cargar conf de rutas

//ruta de prueba
app.get("/ruta-prueba", async (req, res)=>{

    try{
         return res.status(200).json({
            "id": 1,
            "nombre": "matias",
            "apellido": "pellegrineschi"
        })

    }catch(error){
        console.log(error);
    }    
});

// poner servidor a escuchar peticiones http
app.listen(puerto, ()=>{
    console.log("servidor de node corriendo en el puerto ", puerto);
})