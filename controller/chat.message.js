import Messages from '../models/chat.messages.js';
import User from '../models/Register.js';
import dotenv from "dotenv";
dotenv.config()
import Conversations from '../models/chat.conversation.js'
export const postMessage = async (req, res) => {
  try {
    const { conversationId, senderId, message, receiverId = '' } = req.body;
    if (!senderId || !message) return res.status(400).send('Please fill all required fields')
    if (conversationId === 'new' && receiverId) {
      const newCoversation = new Conversations({ members: [senderId, receiverId] });
      await newCoversation.save();
      const newMessage = new Messages({ conversationId: newCoversation._id, senderId, message });
      await newMessage.save();
      return res.status(200).send('Message sent successfully');
    } else if (!conversationId && !receiverId) {
      return res.status(400).send('Please fill all required fields')
    }
    const newMessage = new Messages({ conversationId, senderId, message });
    await newMessage.save();
    res.status(200).send('Message sent successfully');
  } catch (error) {
    console.log(error, 'Error')
  }
}

export const getMessages = async (req, res) => {
  try {
    const checkMessages = async (conversationId) => {
      const messages = await Messages.find({ conversationId });
      const messageUserData = Promise.all(messages.map(async (message) => {
        const user = await User.findById(message.senderId);
        return { user: { id: user?._id, email: user?.email, firstName: user?.firstName }, message: message.message }
      }));
      res.status(200).json(await messageUserData);
    }
    const conversationId = req.params.conversationId;
    if (conversationId === 'new') {
      const checkConversation = await Conversations.find({ members: { $all: [req.query.senderId, req.query.receiverId] } });
      if (checkConversation.length > 0) {
        checkMessages(checkConversation[0]._id);
      } else {
        return res.status(200).json([])
      }
    } else {
      checkMessages(conversationId);
    }
  } catch (error) {
    console.log('Error', error)
  }
}