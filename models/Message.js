const mongoose = require("mongoose");
const Message = new mongoose.Schema({
    senderId        : { type:String, required:true, index:true },
    reciverID       : { type:String, required:true, index:true },
    message         : { type:String, required:true, index:true },
    created_at      : { type:Date, default:Date.now(), index:true },
});
module.exports = mongoose.model("messages",Message);