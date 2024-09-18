const User = require('../model/userModel'); 
const Folder = require('../model/folderModel');

const createFolder = async (req, res) => {
    
    try {
        
        const { folderName, email, parentFolderId } = req.body; 

        // Find user by email 
        
        const user = await User.findOne({ email: email });
        console.log(user);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        //  check its subFolders of parentFolder
        
        if (parentFolderId) {
        
            const parentFolder = await Folder.findById(parentFolderId).populate('subFolders'); // Populate subFolders to access their names
            if (!parentFolder) {
                return res.status(404).json({ message: 'Invalid Folder' });
            }
            
            // Check if a folder with the same name exists in subFolders
            const folderExists = parentFolder.subFolders.some(subFolder => subFolder.folderName === folderName);
            if (folderExists) {
                return res.status(400).json({ message: 'Folder already exists' });
            }
            
            // Create the new folder since it doesn't exist
            const newFolder = new Folder({ folderName, user: user._id });
            await newFolder.save();
            await user.folders.push(newFolder._id)
            await user.save();

            // Add the new folder to the parent's subFolders array
            parentFolder.subFolders.push(newFolder._id);
            await parentFolder.save();
            
            res.status(201).json(newFolder);
            
        } else {
            
            // Create the new folder without a parent
            const newFolder = new Folder({ folderName, user: user._id });
            await newFolder.save();
            
            // Add the new folder to the user's folder list
            user.folders.push(newFolder._id);
            await user.save();
            
            res.status(201).json(newFolder);
        }
    } catch (error) {
        
        res.status(500).json({ message: error.message });
        
    }
};


const deleteFolder = async (req, res) => {
  try {
    const folderId = req.params.id;

    // Find the folder by ID
    const folder = await Folder.findById(folderId).populate('subFolders user');
    
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    // Delete all subfolders and files recursively
    
    await deleteSubfolders(folder);

    // Delete all files in the current folder
    
    await deletePaginatedFiles(folder._id);

    // Update the user who created the folder

    const user = folder.user;
    user.folders = user.folders.filter(f => f.toString() !== folder._id.toString());
    await user.save();

    // Delete the folder itself
    await Folder.findByIdAndDelete(folder._id);

    res.status(200).json({ message: 'Folder and all its contents deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




const deletePaginatedFiles = async (folderId) => {
    let page = 1;
    const limit = 10; // Number of files to process per page
    let hasMorePages = true;
  
    while (hasMorePages) {
      const paginatedFiles = await File.paginate(
        { folderId },
        { page, limit }
      );
  
      if (paginatedFiles.docs.length === 0) {
        hasMorePages = false;
        break;
      }
  
      // Delete the files in this page
      for (const file of paginatedFiles.docs) {
        await File.findByIdAndDelete(file._id);
      }
  
      page++; // Move to the next page
  
      if (!paginatedFiles.hasNextPage) {
        hasMorePages = false;
      }
    }
  };
  
  // Helper function to delete subfolders recursively
  const deleteSubfolders = async (folder) => {
    for (const subFolderId of folder.subFolders) {
      const subFolder = await Folder.findById(subFolderId).populate('subFolders');
      if (subFolder) {
        await deleteSubfolders(subFolder); // Recursively delete subfolders
      }
  
      await deletePaginatedFiles(subFolder._id); // Delete files inside the subfolder
      await Folder.findByIdAndDelete(subFolder._id); // Delete the subfolder itself
    }
  };
  

  
  

module.exports = { createFolder,deleteFolder };
