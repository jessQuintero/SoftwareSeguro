const mongo=require("mongoose");

const tipoSchema=mongo.Schema(
{
    nombre:{
        type: String,
        required: true,
    },
    estado:{
        type: String,
        required: true,
        enum: ["Activo", "Inactivo"],
        default: "Activo",
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

module.exports = mongo.model("marcas",tipoSchema);