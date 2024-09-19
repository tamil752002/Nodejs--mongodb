const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { createFolder, deleteFolder } = require("../controllers/folderController");
const { deleteFile } = require("../controllers/fileController");
const { createproduct,getproduct, putProduct} = require("../controllers/productController");
router.post("/register", register);
router.post("/login", login);
router.post("/prod",authMiddleware, createproduct);
router.get("/prod",authMiddleware, getproduct);
router.put("/prod",authMiddleware, putProduct);
router.post("/createFolder", authMiddleware, createFolder);
router.delete("/deleteFile/:id",authMiddleware,deleteFile)
router.delete("/deleteFolder/:id",authMiddleware,deleteFolder)
router.get("/test",(req,res)=>res.json("hii there"))
 console.log("jiioi")
module.exports = router;
