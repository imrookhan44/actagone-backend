import AddFriends from "../models/AddFriends.js";

export const getFriends = async (req, res) => {
    const friends = await AddFriends.find();
    res.json(friends);
}

export const postFriends = async (req, res) => {
    const { firstName, lastName, userName } = req.body;
    try {

        if (firstName && lastName
            && userName) {
        
    
            const newFriend = await AddFriends.find({ firstName, lastName, userName });
            // await newFriend.save();
            res.json({message: `This Friends Already Exists`});
            res.status(302);
            console.log(newFriend);
        }
        else if (!firstName && !lastName && !userName) {
            const friendsdata = new AddFriends({ firstName, lastName, userName });
            const result = await friendsdata.save();
            res.json({ message: 'Friends Added Successfully' });
            res.status(201);
            console.log(result);
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
 
export const searchFriends = async (req, res) => {
   
    try {
        const friends = await AddFriends.find({
            "$or": [
                {
                    "firstName": { $regex:req.params.key  },
                },

                {
                    "lastName": { $regex:req.params.key },
                },
                {
                    "userName": { $regex: req.params.key },
                }
                ]
        })
        res.send({friends}).res.status(302)

        
        console.log("friends", friends)
    }
    catch (err) {
        res.status(500).json(err);
    }
    
}
