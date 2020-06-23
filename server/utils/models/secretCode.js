const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pwResetSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
        expires: 600,
    },
});

module.exports.Code = mongoose.model("code", pwResetSchema);
