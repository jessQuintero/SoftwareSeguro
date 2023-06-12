const express=require("express");
const {ObtenerEstadoEquipo,addEstadoEquipo,updateEstadoEquipo,deleteEstadoEquipo}= require("../controller/estadoEquipoControlador")

const ruta=express.Router();


ruta.get("/", ObtenerEstadoEquipo);
ruta.post("/", addEstadoEquipo);
ruta.put("/:id", updateEstadoEquipo);
ruta.delete("/:id",deleteEstadoEquipo);


module.exports=ruta;
