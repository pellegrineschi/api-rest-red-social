//importar dependencias y modulos
const User = require("../model/user");
const bcrypt = require ("bcrypt");

const pruebaUser = async (req, res) => {
  try {
    return res.status(200).send({
      message: "Mensaje enviado desde: controller/user.js",
    });
  } catch (error) {
    console.log(error);
  }
};

const checkUser = async(userToSave) =>{
  try{
    const user = await User.find({
      $or: [{email: userToSave.email},{nick: userToSave.nick}],
      }).exec();
      
      return user && user.length >1; 

  }catch(error){
    console.log(error);   
  }
}
