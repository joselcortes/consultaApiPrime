const { Router } = require("express");
const obtenerPaciente = require("../controller/fonasa.controller");
const validarCampofonasa = require("../middleware/validar.campo.fonasa");

let route = Router();
route.post('/obtenerPaciente', validarCampofonasa ,obtenerPaciente)


module.exports = route;
