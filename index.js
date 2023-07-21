import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import router from "./routers/Router.js";
import otpRouter from "./routers/otpRoutes.js";
// import { Server } from 'socket.io';
import Messages from './models/chat.messages.js';
import User from './models/userSchema.js';
import Conversations from './models/chat.conversation.js'
// const io = new Server(8080, {
//     cors: {
//         origin: 'http://localhost:3002',
//     },
// });


dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use('/api/v1',router)
const db = mongoose.connection;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL)
db.on('error', console.error.bind(console, 'mongoose connection error'))
db.once('open', function () {
    console.log('Database Connected');

});
app.use("/api", router, otpRouter);
// Socket.io
// let users = [];
// io.on('connection', socket => {
//     console.log('User connected', socket.id);
//     socket.on('addUser', userId => {
//         const isUserExist = users.find(user => user.userId === userId);
//         if (!isUserExist) {
//             const user = { userId, socketId: socket.id };
//             users.push(user);
//             io.emit('getUsers', users);
//         }
//     });

//     socket.on('sendMessage', async ({ senderId, receiverId, message, conversationId }) => {
//         const receiver = users.find(user => user.userId === receiverId);
//         const sender = users.find(user => user.userId === senderId);
//         const user = await User.findById(senderId);
//         console.log('sender :>> ', sender, receiver);
//         if (receiver) {
//             io.to(receiver.socketId).to(sender.socketId).emit('getMessage', {
//                 senderId,
//                 message,
//                 conversationId,
//                 receiverId,
//                 user: { id: user._id, fullName: user.fullName, email: user.email }
//             });
//         } else {
//             io.to(sender.socketId).emit('getMessage', {
//                 senderId,
//                 message,
//                 conversationId,
//                 receiverId,
//                 user: { id: user._id, fullName: user.fullName, email: user.email }
//             });
//         }
//     });

//     socket.on('disconnect', () => {
//         users = users.filter(user => user.socketId !== socket.id);
//         io.emit('getUsers', users);
//     });
//     // io.emit('getUsers', socket.userId);
// });
app.listen(process.env.PORT || 4000, () => {
    console.log(`Listening on port ${process.env.PORT || 4000}`);

})