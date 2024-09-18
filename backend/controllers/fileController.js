const File = require("../model/fileModel");
const Folder = require("../model/folderModel");
const User = require("../model/userModel");

// Reusable function to create a new file
const createnewFile = async (folderId, originalname, buffer, userId) => {
  const newFile = new File({
    folderId,
    fileName: originalname,
    content: buffer.toString('utf-8'),
    uploadedBy: userId
  });
  await newFile.save();
  return newFile;
};

const fileUpload = async (req, res) => {
  try {
    const { folderId, uploadedBy } = req.body;
    const { originalname, buffer } = req.file;

    if (!folderId || !uploadedBy) {
      return res.status(400).json({ message: 'Folder ID and uploadedBy are required' });
    }

    // Find the user by email
    const user = await User.findOne({ email: uploadedBy });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const folder = await Folder.findById(folderId);

    if (folder) {
      // Create a new file and link it to the folder
      const newFile = await createnewFile(folder._id, originalname, buffer, user._id);
      folder.files.push(newFile._id);
      user.files.push(newFile._id);
      await folder.save();
      await user.save();
  
    } else {
      // If folder is not found, create a file without linking to a folder
      const newFile = await createnewFile(null, originalname, buffer, user._id);
      user.files.push(newFile._id);
      await user.save();
  
    }


    res.status(201).json({
      message: "File saved successfully"
    });
  } catch (error) {
    console.log("in error block");
    
    res.status(500).json({ message: error });
  }
};

const deleteFile = async (req, res) => {
  try {
    const fileId = req.params.id;

    // Find the file by ID
    const file = await File.findById(fileId);

    if (file) {
      // Delete the file and update related Folder and User
      await File.deleteOne({ _id: fileId });
      await Folder.updateOne({ _id: file.folderId }, { $pull: { files: fileId } });
      await User.updateOne({ _id: file.uploadedBy }, { $pull: { files: fileId } });
      return res.status(200).json({ message: "File deleted successfully" });
      
    } else {
      // If file is not found
      return res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { fileUpload, deleteFile };
