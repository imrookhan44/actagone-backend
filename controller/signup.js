import OTP from '../models/otpModel.js';
// import user from '../models/userSchema.js'
export const updateName = async (req, res) => {
    const { _id } = req.body;
    if (!_id) {
        return res.status(404).json({ message: 'Id is required' })
    }
    try {
        let userData = await OTP.findById(_id);

        if (!userData) {
            return res.status(404).json({ message: 'user not found' });
        }
        await OTP.findByIdAndUpdate(_id, req.body)
        res.status(200).json({ message: 'Name updated successfully' });
    } catch (error) {
        console.error('Error updating name:', error);
        res.status(500).json({ error: 'Failed to update name' });
    }
}

export const  getAllUsers =  async (req, res)=>  {
    try {
        const users = await OTP.find()
            res.send(users);
    }
    catch (err) {
        console.log(err)
    }
    // console.log(users)

    
}


