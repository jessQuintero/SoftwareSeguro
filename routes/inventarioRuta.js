const express=require("express");
const {obtenerEstadoEquipo,addInventarioEquipo,updateInventarioEquipo,deleteInventarioEquipo}= require("../controller/inventarioControlador")

const ruta=express.Router();


ruta.get("/", obtenerEstadoEquipo);
ruta.post("/", addInventarioEquipo);
ruta.put("/:id", updateInventarioEquipo);
ruta.delete("/:id",deleteInventarioEquipo);


module.exports=ruta;
