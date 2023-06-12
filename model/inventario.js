const { default: mongoose } = require("mongoose");
const mongo=require("mongoose");

const inventarioSchema=mongo.Schema(
{
    serial:{
        type: String,
        unique:true,
        required: true,
    },
    modelo:{
        type: String,
        unique:true,
        required: true,

    },

    descrip:{
        type: String,
        required: false,
       },


    fotoEquipo:{
    type: String,
    required: true,
    },

       
    color:{
    type: String,
    required: false,
    },

    fechaCompra:{
    type: Date,
    required: true,
    },

    precio:{
    type: Number,
    required: true,
    },

    usuarioCargo:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios',
    required: true,
    },

    marca:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'marcas',
    required: true,
    },

    estadoEquipo:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'estadoEquipo',
    required: true,
    },

    tipoEquipo:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TipoEquipo',
    required: true,
    },

});

module.exports = mongo.model("inventario",inventarioSchema);