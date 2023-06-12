const inventarioEquipos=require("../model/inventario");
const inventarioUsuarios=require("../model/Usuarios");


const obtenerEstadoEquipo= async(req, res, next)=>{
let inventarios;



try {
  
   inventarios=await inventarioEquipos.find();
} catch (error) {
    return next(error);
}
if(!inventarios){
return res.status(500).json({message: "Error Interno del Servidor"})


}
return res.status(200).json({inventarios})

}


const addInventarioEquipo= async(req, res, next)=>{
    const {serial,modelo,descrip,fotoEquipo,color,fechaCompra,precio,usuarioCargo,marca,estadoEquipo,tipoEquipo} = req.body;
    const usuarioCar = await inventarioEquipos.findById(req.body.usuarioCargo);
    const modeloBuscar = await inventarioEquipos.findOne({modelo});
    const serialBuscar = await inventarioUsuarios.findOne({serial});
   
    if(serialBuscar){ 
        return res.status(400).json({message: "serial repetido"})

    
            if(modeloBuscar) {
            return res.status(400).json({message: "modelo repetido"})

            }
                         if(usuarioCar) {
                         return res.status(400).json({message: "Usuario a Cargo Invalido"})
    
            }
    }


if(!serial && serial.trim()=="" && !modelo && modelo.trim()=="" && !fotoEquipo && fotoEquipo.trim()=="")
{
    return res.status(422).json({message: "Datos Ivalidos"});

}

    let inventarios;
    try {
        inventarios=new inventarioEquipos({
            serial,
            modelo,
            descrip,
            fotoEquipo,
            color,
            fechaCompra,
            precio,
            usuarioCargo,
            marca,
            estadoEquipo,
            tipoEquipo
           
        });

        inventarios=await inventarios.save();

    } catch (error) {
        return next(error);
    }
    if(!inventarios){
    return res.status(500).json({message: "Error Interno del Servidor"})
    
    
    }
    return res.status(201).json({inventarios})
    
    }



    const updateInventarioEquipo= async(req, res, next)=>{
        const id= req.params.id;


        const {serial,modelo,descrip,fotoEquipo,color,fechaCompra,precio,usuarioCargo,marca,estadoEquipo,tipoEquipo} = req.body;
    
if(!serial && serial.trim()=="" && !modelo && modelo.trim()=="" && !fotoEquipo && fotoEquipo.trim()=="")    {
        return res.status(422).json({message: "Datos Ivalidos"});
    
    }
    
        let inventarios;
        try {
            
            inventarios=await inventarioEquipos.findByIdAndUpdate(id,{
                serial,
                modelo,
                descrip,
                fotoEquipo,
                color,
                fechaCompra,
                precio,
                usuarioCargo,
                marca,
                estadoEquipo,
                tipoEquipo
            });
    
            console.log(inventarios);
        } catch (error) {
            return next(error);
        }
        if(!inventarios){
        return res.status(500).json({message: "Error Interno del Servidor"})
        
        
        }
        return res.status(200).json({message: "Datos Actualizados Correctamente"})
        
        }


//borrar

const deleteInventarioEquipo= async(req, res, next)=>{
    const id= req.params.id;
    let inventarios;

    try {
        
        inventarios=await inventarioEquipos.findByIdAndDelete(id);

    } catch (error) {
        return next(error);
    }
    if(!inventarios){
    return res.status(500).json({message: "No se pudo Borrar los Datos"})
    
    
    }
    return res.status(200).json({message: "Datos Borrados Correctamente"})
    
    }





exports.obtenerEstadoEquipo=obtenerEstadoEquipo;
exports.addInventarioEquipo=addInventarioEquipo;
exports.updateInventarioEquipo=updateInventarioEquipo;
exports.deleteInventarioEquipo=deleteInventarioEquipo;