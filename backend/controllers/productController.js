const product =require("../model/productModel");

const createproduct=async(req,res)=>{
    try{

        const{prodName,MRP }=req.body
        const newFolder = new product({ prodName, MRP, });
        await newFolder.save();
        res.status(201).json({message:"product has been added"})

    }
    catch(error){
        res.status(500).json({ message: error.message });

    }


}
const getproduct=async(req,res)=>{
    try{

        
        const newFolder = await product.find({});
        res.status(201).json(newFolder)

    }
    catch(error){
        res.status(500).json({ message: error.message });

    }


}
module.exports={createproduct,getproduct}

