const mongo=require("mongoose");

const tipoSchema=mongo.Schema(
{
    nombre:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
    },

    estado:{
        type: String,
        required: true,
        enum: ["Activo", "Inactivo"],
        default: "Activo",

    },

    clave:{
        type: String,
        required: true,
        
    },

    rol:{
        type: String,
        required: true,
        enum: ['administrador', 'docente'],
        default: 'docente',

    },



    fechaCrea:{
        type: Date,
        default: Date.now()
       },


 fechaAct:{
        type: Date,
        default: Date.now()
       },


});

module.exports = mongo.model("moduloUsuario",tipoSchema);