const express = require("express");
const router = express.Router();
const publicationController = require ("../controller/publication");

// definir rutas
router.get("/prueba-publication", publicationController.pruebaPublication);

//exportar router
module.exports = router