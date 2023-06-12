const usuario=require("../model/Usuarios");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Obtenerusuarios= async(req, res, next)=>{
let usuarios;
try {
    usuarios=await usuario.find();
} catch (error) {
    return next(error);
}
if(!usuarios){
return res.status(500).json({message: "Error Interno del Servidor"})


}
return res.status(200).json({usuarios})

}


const addusuarios= async(req, res, next)=>{
    const {nombre,email, estado,clave,rol} = req.body;


// Encriptar la contraseña
contraseñaEncriptada = await bcrypt.hash(req.body.clave, 10);




if(!nombre && nombre.trim()=="" && !email && email.trim()=="" && !estado && estado.trim()=="" && !contraseñaEncriptada && contraseñaEncriptada.trim()=="" && !rol && rol.trim()=="" )
{
    return res.status(422).json({message: "Datos Ivalidos"});

}

    let usuarios;
    try {
        usuarios=new usuario({
            nombre,
            email,
            estado,
            clave:contraseñaEncriptada,
            rol
           
        });

        usuarios=await usuarios.save();

    } catch (error) {
        return next(error);
    }
    if(!usuarios){
    return res.status(500).json({message: "Error Interno del Servidor"})
    
    
    }
    return res.status(201).json({usuarios})
    
    }



    const updateusuarios= async(req, res, next)=>{
        const id= req.params.id;


        const {nombre,email, estado, fechaAct} = req.body;
    
    if(!nombre && nombre.trim()=="" && !email && email.trim()=="" && !estado && estado.trim()=="")
    {
        return res.status(422).json({message: "Datos Ivalidos"});
    
    }
    
        let usuarios;
        try {
            
            usuarios=await usuario.findByIdAndUpdate(id,{
                nombre,
                email,
                estado,
                fechaAct:Date.now()
                
            });
    
            console.log(usuarios);
        } catch (error) {
            return next(error);
        }
        if(!usuarios){
        return res.status(500).json({message: "Error Interno del Servidor"})
        
        
        }
        return res.status(200).json({message: "Datos Actualizados Correctamente"})
        
        }


//borrar

const deleteusuarios= async(req, res, next)=>{
    const id= req.params.id;
    let usuarios;

    try {
        
        usuarios=await usuario.findByIdAndDelete(id);

    } catch (error) {
        return next(error);
    }
    if(!usuarios){
    return res.status(500).json({message: "No se pudo Borrar los Datos"})
    
    
    }
    return res.status(200).json({message: "Datos Borrados Correctamente"})
    
    }


    //Login del usuario

    const loginusuarios= async(req, res, next)=>{
try{
    const  user=await usuario.findOne({email:req.body.email});
    if(!user){
        throw new Error("Usuario no encontrado");

    }

const  claveValidad=await bcrypt.compare(
    req.body.clave,
    user.clave
    
);
if(!claveValidad){
    throw new Error("Clave no validad");


    
}


payload = {
    userId: user._id,
    email: user.email,
    role: user.rol
}


//crear y asignar token
//Acceso
const token = jwt.sign(payload,process.env.jwt_secret);
//const token = jwt.sign({userId: user._id},process.env.jwt_secret);

res.send({
success: true,
message:"Usuario logeado Exitosamente",
data: token


});
}

catch(error)
{
    res.send({
        success: false,
        message:error.message,
      

});
}
    }
   
exports.loginusuarios=loginusuarios;
exports.Obtenerusuarios=Obtenerusuarios;
exports.addusuarios=addusuarios;
exports.updateusuarios=updateusuarios;
exports.deleteusuarios=deleteusuarios;