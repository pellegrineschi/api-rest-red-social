//importar dependencias y modulos
const User = require("../model/user.model");
const bcrypt = require("bcrypt");

//importar servicios
const jwt = require("../services/jwt");

const pruebaUser = async (req, res) => {
  try {
    return res.status(200).send({
      message: "Mensaje enviado desde: controller/user.js",
    });
  } catch (error) {
    console.log(error);
  }
};

//----------------------------------------------------------//

//verificar usuarios duplicados
const checkUser = async (userToSave) => {
  try {
    const user = await User.find({
      $or: [{ email: userToSave.email }, { nick: userToSave.nick }],
    }).exec();

    return user && user.length > 1;
  } catch (error) {
    throw new Error("error en la consulta de usuarios");
  }
};

//----------------------------------------------------------//

//registro de usuarios
const register = async (req, res) => {
  //tomas datos de la peticion
  let params = req.body;

  //comprobar que lleguen bien los datos(+validacion)
  if (
    !params.name ||
    !params.email ||
    !params.nick ||
    !params.password ||
    !params.surname
  ) {
    return res.status(400).json({
      status: "error",
      massage: "faltan datos por enviar",
    });
  }

  //creo el objeto user
  let userToSave = new User(params);

  // control de usuarios duplicados
  try {
    const userExist = await checkUser(userToSave);

    if (userExist) {
      return res.status(200).json({
        status: "sucess",
        message: "el usuario ya existe",
      });
    }

    //cifrar password
    const hashedPassword = await bcrypt.hash(userToSave.password, 10);
    userToSave.password = hashedPassword;

    //guardar en la base de datos

    const savedUser = async (userToSave) => {
      try {
        await userToSave.save();
        return res.status(200).json({
          status: "sucess",
          message: "usuario guardado con exito",
          user: userToSave,
        });
      } catch (error) {
        return res.status(400).json({
          status: "error",
          message: "error al guardar el usuario",
        });
      }
    };

    await savedUser(userToSave);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "error en la consulata de usuarios",
    });
  }
};

//------------------------------------------------------------//

const login = async (req, res) => {
  //tomas datos de la peticion
  let params = req.body;

  //comprobar que lleguen bien los datos(+validacion)
  if (!params.email || !params.password) {
    return res.status(400).json({
      status: "error",
      massage: "faltan datos por enviar",
    });
  }

  //buscar en la bbdd si existe

  try {
    const userExist = await User.findOne({
      $or: [{ email: params.email }],
    }).select({"create_at":0});// lo que no quiero que me devuleva

    if (!userExist) {
      return res.status(200).json({
        status: "succes",
        message: "el usuario no existe",
      });
    }

    //comprobar contraseña

    let pwd = bcrypt.compare(params.password, userExist.password); 

    if(!pwd){
      return res.status(400).json({
        status: "error",
        message: "usuario o cantraseña incorrectos"
      })

    }
    //conseguir token
    const token = jwt.createToken(userExist);

    //devolder datos de usuario

    return res.status(200).json({
      status: "sucess",
      message: "accion de login",
      userExist:{
        id: userExist._id,
        name: userExist.name,
        surname: userExist.surname,
        nick: userExist.nick
      },
      token
    });

    
    
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "error en login",
    });
  }
};

//exportar aciones

module.exports = {
  pruebaUser,
  register,
  login,
};
