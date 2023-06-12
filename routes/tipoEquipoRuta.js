const express=require("express");
const {ObtenerDatosTipo,addDatosTipo,updateDatosTipo,deleteDatosTipo}= require("../controller/tipoEquipoControlador")

const ruta=express.Router();


ruta.get("/", ObtenerDatosTipo);
ruta.post("/", addDatosTipo);
ruta.put("/:id", updateDatosTipo);
ruta.delete("/:id",deleteDatosTipo);


module.exports=ruta;

