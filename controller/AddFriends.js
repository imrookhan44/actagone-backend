import AddFriends from "../models/AddFriends.js";
import OTP from "../models/otpModel.js";

export const getFriends = async (req, res) => {
    try {
        const friends = await AddFriends.find();
        res.json(friends);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const postFriends = async (req, res) => {
    const { firstName, lastName, userName, userId } = req.body; // Add otpCode to the destructuring

    try {
        if (firstName && lastName && userName) {
            const otp = await OTP.findOne({ firstName, lastName, userName });
            if (otp) {
                const newFriend = new AddFriends({ firstName, lastName, userName, userId });
                await newFriend.save();
                res.status(201).json(newFriend); 
                console.log(newFriend);
    
            } else {
                res.status(404).json({ message: "data not found" });
            }
        } else {
            res.status(400).json({ message: "Please fill in all fields including OTP" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteFriend = async (req, res) => {
    try {
        const friend = await AddFriends.findByIdAndDelete(req.params.id);
        if (friend) {
            res.status(200).json({ message: `${friend} Deleted Successfully ` }); // Sending JSON response before setting status
        } else {
            res.status(404).json({ message: "Friend not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const searchFriends = async (req, res) => {
    try {
        const friends = await AddFriends.find({
            $or: [
                { firstName: { $regex: req.params.key } },
                { lastName: { $regex: req.params.key } },
                { userName: { $regex: req.params.key } }
            ]
        });
        res.status(200).json({ friends }); // Sending JSON response before setting status
        console.log("friends", friends);
    } catch (err) {
        res.status(500).json(err);
    }
};
