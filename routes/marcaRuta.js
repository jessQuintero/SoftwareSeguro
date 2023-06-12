const express=require("express");
const {ObtenerMarcas,addMarcas,updateMarcas,deleteDatosTipo,verificarRol}= require("../controller/marcasControlador")
//const {verificarRol}= require("../controller/usuariosControlador")


const ruta=express.Router();


ruta.get("/", ObtenerMarcas,verificarRol('administrador', 'docente'));
ruta.post("/", addMarcas,verificarRol('administrador'));
ruta.put("/:id", updateMarcas,verificarRol('administrador'));
ruta.delete("/:id",deleteDatosTipo,verificarRol('administrador'));


module.exports=ruta;