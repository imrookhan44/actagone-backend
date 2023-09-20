import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import RegisterRoute from "./routers/RegisterRoute.js";
import { Server } from "socket.io";
import User from "./models/Register.js";
import chatRoutes from "./routers/ChatRoutes.js";
import stripeRoutes from './routers/StripeRoutes.js'

const io = new Server(8080, {
    cors: {
        origin: "http://localhost:3000",
    },
});
console.log("process.env.DATABASE_URL", process.env.DATABASE_URL)

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const db = mongoose.connection;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL);
db.on("error", console.error.bind(console, "mongoose connection error"));
db.once("open", function () {
    console.log("Database Connected");
});
app.use("/api/v1", RegisterRoute);
app.use("/api/v1", chatRoutes);
app.use("/api/v1", stripeRoutes);
let users = [];
io.on("connection", (socket) => {
    console.log("User connected", socket.id);
    socket.on("addUser", (userId) => {
        const isUserExist = users.find((user) => user.userId === userId);
        if (!isUserExist) {
            const user = { userId, socketId: socket.id };
            users.push(user);
            io.emit("getUsers", users);
        }
    });

    socket.on(
        "sendMessage",
        async ({ senderId, receiverId, message, conversationId }) => {
            console.log("message", senderId, receiverId, message, conversationId);
            const receiver = users.find((user) => user.userId === receiverId);
            const sender = users.find((user) => user.userId === senderId);
            const user = await User.findById(senderId);
            console.log("user :>> ", user);
            console.log("sender :>> ", sender, receiver);
            if (receiver) {
                io.to(receiver?.socketId)
                    .to(sender.socketId)
                    .emit("getMessage", {
                        senderId,
                        message,
                        conversationId,
                        receiverId,
                        user: { id: user._id, fullName: user.fullName, email: user.email },
                    });
            } else {
                io.to(sender?.socketId).emit("getMessage", {
                    senderId,
                    message,
                    conversationId,
                    receiverId,
                    user: { id: user._id, fullName: user.fullName, email: user.email },
                });
            }
        }
    );

    socket.on("disconnect", () => {
        users = users.filter((user) => user.socketId !== socket.id);
        io.emit("getUsers", users);
    });
    // io.emit('getUsers', socket.userId);
});
app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${process.env.PORT || 5000}`);
});
