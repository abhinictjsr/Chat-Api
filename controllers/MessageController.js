const Message = require("../models/Message");
const Helper = require("../config/Helper");

var MessageController = {};
MessageController.sendMessage = (req,res) => {
    var message = new Message({
        senderId       : req.body.senderId,
        reciverID      : req.body.reciverID,
        message        : req.body.message,
    });
    message.save().then(() => {
        var data = message;
        Helper.response(200,'Message has been sent Successfully!',data,res);
    }).catch((error) => {
        console.log(error);
        Helper.response(200,'Internal Server Error!',{},res);
    });
}

MessageController.chatHistory = (req,res) => {
    Message.find({$or: [ { senderId: req.body.userId }, { reciverID: req.body.userId } ]}).sort({"created_at": -1}).exec(function(err, history){
        if(err){
            Helper.response(200,'Server Error!',[],res);
        }else if(history==undefined || history==undefined || history==null){
            Helper.response(200,'No Data Found!',[],res);
        }else {
            var data =[];
            var user_ids = [];
            history.map((h)=>{
                if(user_ids.includes(h.senderId)==false && user_ids.includes(h.reciverID)==false ){
                    data.push( {
                        senderId:h.senderId,
                        reciverID:h.reciverID,
                        message:h.message,
                        created_date:Helper.getDate(h.created_at).created_date,
                        created_time:Helper.getDate(h.created_at).created_time,
                    });
                    if(h.senderId != req.body.userId){
                        user_ids.push(h.senderId);
                    }
                    if(h.reciverID != req.body.userId){
                        user_ids.push(h.reciverID);
                    }
                }
            });
            Helper.response(200,'Record Fetched Successfully!',data,res);
        }
    });
}

MessageController.oneToOneChatHistory = (req,res) => {
    var ids = [req.body.userId,req.body.chatUserId];
    Message.find({ senderId: {$in:ids} , reciverID: {$in:ids}}).sort({"created_at": 1}).exec(function(err, history){
        if(err){
            Helper.response(200,'Server Error!',[],res);
        }else if(history==undefined || history==undefined || history==null){
            Helper.response(200,'No Data Found!',[],res);
        }else {
            var data =history.map((h)=>{
                return {
                    senderId:h.senderId,
                    reciverID:h.reciverID,
                    message:h.message,
                    created_date:Helper.getDate(h.created_at).created_date,
                    created_time:Helper.getDate(h.created_at).created_time,
                }
            });
            Helper.response(200,'Record Fetched Successfully!',data,res);
        }
    });
}

MessageController.totalChatUser = (req,res) => {
    Message.find({$or: [ { senderId: req.body.userId }, { reciverID: req.body.userId } ]},(err,history)=>{
        if(err){
            Helper.response(200,'Server Error!',[],res);
        }else if(history==undefined || history==undefined || history==null){
            Helper.response(200,'No Data Found!',[],res);
        }else {
            var user_ids = [];
            history.map((h)=>{
                if(user_ids.includes(h.senderId)==false && user_ids.includes(h.reciverID)==false ){
                    if(h.senderId != req.body.userId){
                        user_ids.push(h.senderId);
                    }
                    if(h.reciverID != req.body.userId){
                        user_ids.push(h.reciverID);
                    }
                }
            });
            
            var data ={
                total_user : user_ids.length,
                userIds: user_ids
            };
            Helper.response(200,'Record Fetched Successfully!',data,res);
        }
    });
}
module.exports = MessageController;