import AddFriends from "../models/AddFriends";

export const getFriends = async (req, res) => {
    const friends = await AddFriends.find();
    res.json(friends);
}

export const postFriends = async (req, res) => {
    const { firstName, lastName, userName } = req.body;
    try {

        if (firstName || lastName
            || userName) {
        
    
            const newFriend = new AddFriends({ firstName, lastName, userName });
            await newFriend.save();
            res.json(newFriend);
            res.status(201);
            console.log(newFriend);
        }
        else {
            res.status(400).json({ message: "Please fill in all fields" });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}

export const deleteFriend = async (req, res) => {
    
    try {
        const friend = await AddFriends.findByIdAndDelete(req.params.id);
        if (friend) {
            res.json({ message: `${friend} Deleted Successfully ` });
            res.status(200);
        }
        else {
            res.status(404).json({ message: "Friend not found" });
        }

    }
    catch (err) {
        res.status(500).json(err);
    }
 }
