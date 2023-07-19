import User from '../models/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
export const controller = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password)
  if (!name || !email || !password) {
    return res
      .status(201)
      .json({ Error: true, msg: "Please enter all fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      let hashedpassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        name,
        email,
        password: hashedpassword,

      });
      console.log("new user", newUser)
      await newUser.save().then((result) => {
        const token = jwt.sign(
          { email: newUser.email, id: newUser._id }, "your"
        );
        return res.status(201).json({
          newUser,
          token,
          msg: "User Created Successfully",
        });
      });

    } else {
      res.status(201).json({
        status: false,
        Error: true,
        msg: "User Already Exist",
      });
      return res.status(201).json({ msg: "User Already Exist" });
    }
  } catch (error) {
    return console.log(error);
  }
}

export const profile_img = async (req, res) => {
  // Access the uploaded image
  const profile = req.file.filename;
  const userId = req.body.userId;
  try {
    // Update the user's profile_img field in the database
    const updatedUser = await User.findByIdAndUpdate(userId, { profile_img: profile }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ message: 'Profile image updated successfully', user: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const userId = req.params.userId;
    const users = await User.find({ _id: { $ne: userId } });
    const usersData = Promise.all(users.map(async (user) => {
      return { user: { email: user.email, firstName: user.firstName, receiverId: user._id } }
    }))
    res.status(200).json(await usersData);
  } catch (error) {
    console.log('Error', error)
  }
}
