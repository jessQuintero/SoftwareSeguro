const tipoE=require("../model/TipoEquipo");

const ObtenerDatosTipo= async(req, res, next)=>{
let tipos;
try {
    tipos=await tipoE.find();
} catch (error) {
    return next(error);
}
if(!tipos){
return res.status(500).json({message: "Error Interno del Servidor"})


}
return res.status(200).json({tipos})

}


const addDatosTipo= async(req, res, next)=>{
    const {nombre,estado,fechaCrea,fechaAct} = req.body;

const nombreDado=await tipoE.findOne({nombre});

    if(nombreDado){
        throw new Error("Ya existe ese nombre");
    }

    let tipos;
    try {
        tipos=new tipoE({
            nombre,
            estado,
           
        });

        tipos=await tipos.save();

    } catch (error) {
        return next(error);
    }
    if(!tipos){
    return res.status(500).json({message: "Error Interno del Servidor"})
    
    
    }
    return res.status(201).json({tipos})
    
    }



    const updateDatosTipo= async(req, res, next)=>{
        const id= req.params.id;


        const {nombre,estado,fechaAct} = req.body;
    
    if(!nombre && nombre.trim()=="" && !estado && estado.trim()=="")
    {
        return res.status(422).json({message: "Datos Ivalidos"});
    
    }
    
        let tipos;
        try {
            
            tipos=await tipoE.findByIdAndUpdate(id,{
                nombre,
                estado,
                fechaAct:Date.now()
            });
    
            console.log(tipos);
        } catch (error) {
            return next(error);
        }
        if(!tipos){
        return res.status(500).json({message: "Error Interno del Servidor"})
        
        
        }
        return res.status(200).json({message: "Datos Actualizados Correctamente"})
        
        }


//borrar

const deleteDatosTipo= async(req, res, next)=>{
    const id= req.params.id;
    let tipos;

    try {
        
        tipos=await tipoE.findByIdAndDelete(id);

    } catch (error) {
        return next(error);
    }
    if(!tipos){
    return res.status(500).json({message: "No se pudo Borrar los Datos"})
    
    
    }
    return res.status(200).json({message: "Datos Borrados Correctamente"})
    
    }





exports.ObtenerDatosTipo=ObtenerDatosTipo;
exports.addDatosTipo=addDatosTipo;
exports.updateDatosTipo=updateDatosTipo;
exports.deleteDatosTipo=deleteDatosTipo;