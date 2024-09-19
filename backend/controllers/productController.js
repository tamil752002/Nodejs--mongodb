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
const putProduct = async (req, res) => {
    const { prodName } = req.body; // New product name
    const { id } = req.query; // Product ID from the request parameters
  
    if (!prodName) {
      return res.status(400).json({ message: "Product name is required" });
    }
  
    try {
      // Find the product by ID and update its prodName
      const updatedProduct = await product.findByIdAndUpdate(
        id,
        { prodName },
        { new: true } // Return the updated product
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "Product name updated", updatedProduct });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
module.exports={createproduct,getproduct,putProduct}

