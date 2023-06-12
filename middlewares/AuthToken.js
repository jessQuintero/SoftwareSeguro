const jwt = require('jsonwebtoken');
//require('dotenv').config();

module.exports = function(req,res,next){
    if(req.path != '/usuarios/login'){
        if(req.headers.authorization){
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token,process.env.jwt_secret,function(error,decoded){
                if(error) return res.status(403).send({message: 'No tienes los permisos suficientes para estar aquí...',error});
                if(req.method != 'GET'){
                    if(decoded.role == 'administrador') next();
                    else res.status(403).send({message: 'No tienes los permisos suficientes para estar aquí...'});
                }else{
                    next();
                }
            });
        }else res.status(403).send({message: 'No tienes los permisos suficientes para estar aquí...'});
    }else next();
}