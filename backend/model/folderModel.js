const mongoose = require("mongoose");
const { Schema } = mongoose;

const folderSchema = new Schema({
    folderName: {
        type: String,
        required: true,
        trim: true,
    },
    dateOfCreation: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    subFolders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Folder",
        },
    ],
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    files: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "File",
        },
    ],
});

folderSchema.methods.softDelete = function () {
    this.isDeleted = true;
    this.deletedAt = new Date();
    return this.save();
};

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;
