const usuario=require("../model/Usuarios");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    
    //crear y asignar token
    
    const token = jwt.sign({userId: user._id},process.env.jwt_secret);
    
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