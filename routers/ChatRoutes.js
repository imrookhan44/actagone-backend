import express from "express";
import { getConversation, postConversation } from "../controller/chat.conversation.js";
import { getMessages, postMessage } from "../controller/chat.message.js";

const router = express.Router();

//conversation routes
router.route("/conversation").post(postConversation);
router.route("/conversation/:userId").get(getConversation);

//message routes
router.route("/message").post(postMessage);
router.route("/message/:conversationId").get(getMessages);

export default router;
