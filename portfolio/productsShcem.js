const mongoose = require("mongoose");

const product = new mongoose.Schema({  
    name:{type:String},
    type:{type:String},
    discription:{type:String},
    link:{type:String},
    client:{type:String},
    images:[],
    frontImage:{type:Object},
    state:{type:Boolean,default:false}
}
    );
module.exports= mongoose.model("Product",product)
      