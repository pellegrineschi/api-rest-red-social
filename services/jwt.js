//importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

//clave secreta
const secret = "Tobias.primo02";

//funcion generar token
const createToken = (user) => {
  const playload = {
    id: user._id,
    name: user.name,
    surname: user.surname,
    nick: user.nick,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix,
    exp: moment().add(30, "days").unix,
  };
  //devolver token codificado
  return jwt.encode(playload, secret);
};

module.exports = {
  createToken,
};
