const express = require("express");
const router = express.Router();
const followController = require ("../controller/follow");

// definir rutas
router.get("/prueba-follow", followController.pruebaFollow);

//exportar router
module.exports = router