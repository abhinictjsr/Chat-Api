const express = require('express');
const router = express.Router();
const { check,body, validationResult } = require('express-validator');
const MessageController = require("../controllers/MessageController");
const Helper = require("../config/Helper");


router.get('/',  (req, res) =>{
    res.send('Welcome');
});

router.post('/send_msg',  
    check('senderId').not().isEmpty().withMessage("The SenderId field cannot be empty!!"),
    body('reciverID').not().isEmpty().withMessage("The ReciverID field cannot be empty!!"),
    body('message').not().isEmpty().withMessage("The Message field cannot be empty!!"),
    (req, res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            Helper.response(200,'Validation Error!',{ errors: errors.array() },res);
        }else{
            MessageController.sendMessage(req,res);
        }
});

router.post('/chat_history',
    check('userId').not().isEmpty().withMessage("The UserID field cannot be empty!!"),
    (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            Helper.response(200,'Validation Error!',{ errors: errors.array() },res);
        }else{
            MessageController.chatHistory(req,res);
        }  
});

router.post('/one_to_one_chat_history',
    check('userId').not().isEmpty().withMessage("The UserID field cannot be empty!!"),
    body('chatUserId').not().isEmpty().withMessage("The Chat UserID field cannot be empty!!"),
    (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            Helper.response(200,'Validation Error!',{ errors: errors.array() },res);
        }else{
            MessageController.oneToOneChatHistory(req,res);
        }  
});


router.post('/total_chat_user',
    check('userId').not().isEmpty().withMessage("The UserID field cannot be empty!!"),
    (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            Helper.response(200,'Validation Error!',{ errors: errors.array() },res);
        }else{
            MessageController.totalChatUser(req,res);
        }  
});

module.exports = router; 