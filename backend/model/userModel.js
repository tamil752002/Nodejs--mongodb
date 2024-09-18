const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    dateJoined: {
        type: Date,
        default: Date.now,
    },
    folders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Folder",
        },
    ],
    files: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File',
        },
    ],
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
