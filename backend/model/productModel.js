const mongoose=require("mongoose");
const {Schema}=mongoose;

const productschema=new Schema({

    prodName:{
        type:String,
        require:true,
        trim:true

    },
    MRP:{
        type:Number,
        require:true,
        

    }


        



})
const product=mongoose.model("product",productschema)
module.exports=product