const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "basic",
    },
    status: {
        type: String,
        default: "pending",
    },
    accepted: {
        type: Boolean,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
    },
});

module.exports.User = mongoose.model("user", UserSchema);
