import Conversation from '../models/chat.conversation.js'
import User from '../models/Register.js '
export const postConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const newCoversation = new Conversation({ members: [senderId, receiverId] });
    await newCoversation.save();
    res.status(200).send('Conversation created successfully');
  } catch (error) {
    console.log(error, 'Error')
  }
}
export const getConversation = async (req, res) => {
  try {
    const userId = req.params.userId;
    const conversations = await Conversation.find({ members: { $in: [userId] } });
    const conversationUserData = Promise.all(conversations.map(async (conversation) => {
      const receiverId = conversation.members.find((member) => member !== userId);
      const user = await User.findById(receiverId);
      return {
        user: {
          receiverId: user._id, email: user.email, fullName: user.firstName,
          profile_img: user.profile_img
        }, conversationId: conversation._id
      }
    }))
    res.status(200).json(await conversationUserData);
  } catch (error) {
    console.log(error, 'Error')
  }
}