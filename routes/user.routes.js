const express = require("express");
const router = express.Router();
const userController = require ("../controller/user");

// definir rutas
router.get("/prueba-usuario", userController.pruebaUser);
router.post("/register", userController.register);
router.post("/login", userController.login);




//exportar router
module.exports = router