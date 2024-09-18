const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2"); 

const fileSchema = new Schema({
    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

fileSchema.methods.softDelete = function () {
    this.isDeleted = true;
    this.deletedAt = new Date();
    return this.save();
};

fileSchema.plugin(mongoosePaginate);

const File = mongoose.model("File", fileSchema);

module.exports = File;
