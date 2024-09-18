const express = require("express");
const router = express.Router();
const {fileUpload} = require("../controllers/fileController");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); 

router.post("/upload",upload.single('file'),fileUpload);

module.exports = router;