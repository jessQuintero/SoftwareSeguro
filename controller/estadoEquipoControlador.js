const estadoE=require("../model/estadoEquipo");


const ObtenerEstadoEquipo= async(req, res, next)=>{


let estados;
//let token= require.headers['x-access-token'];
let token = req.headers["x-access-token"];

if(!token)
{
    return res.status(401).json({
        success: false,
        message: "Token no colocado"
    });


    

}

try {
    estados=await estadoE.find();
} catch (error) {
    return next(error);
}
if(!estados){
return res.status(500).json({message: "Error Interno del Servidor"})


}
return res.status(200).json({estados})

}


const addEstadoEquipo= async(req, res, next)=>{
    const {nombre,estado,fechaCrea,fechaAct} = req.body;

if(!nombre && nombre.trim()=="" && !estado && estado.trim()=="" && !fechaCrea && fechaCrea.trim()=="")
{
    return res.status(422).json({message: "Datos Ivalidos"});

}

    let estados;
    try {
        estados=new estadoE({
            nombre,
            estado,
           
        });

        estados=await estados.save();

    } catch (error) {
        return next(error);
    }
    if(!estados){
    return res.status(500).json({message: "Error Interno del Servidor"})
    
    
    }
    return res.status(201).json({estados})
    
    }



    const updateEstadoEquipo= async(req, res, next)=>{
        const id= req.params.id;


        const {nombre,estado} = req.body;
    
    if(!nombre && nombre.trim()=="" && !estado && estado.trim()=="")
    {
        return res.status(422).json({message: "Datos Ivalidos"});
    
    }
    
        let estados;
        try {
            
            estados=await estadoE.findByIdAndUpdate(id,{
                nombre,
                estado,
                fechaAct:Date.now()
            });
    
            console.log(estados);
        } catch (error) {
            return next(error);
        }
        if(!estados){
        return res.status(500).json({message: "Error Interno del Servidor"})
        
        
        }
        return res.status(200).json({message: "Datos Actualizados Correctamente"})
        
        }


//borrar

const deleteEstadoEquipo= async(req, res, next)=>{
    const id= req.params.id;
    let estados;

    try {
        
        estados=await estadoE.findByIdAndDelete(id);

    } catch (error) {
        return next(error);
    }
    if(!estados){
    return res.status(500).json({message: "No se pudo Borrar los Datos"})
    
    
    }
    return res.status(200).json({message: "Datos Borrados Correctamente"})
    
    }





exports.ObtenerEstadoEquipo=ObtenerEstadoEquipo;
exports.addEstadoEquipo=addEstadoEquipo;
exports.updateEstadoEquipo=updateEstadoEquipo;
exports.deleteEstadoEquipo=deleteEstadoEquipo;