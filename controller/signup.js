import OTP from '../models/otpModel.js';
async function updateName(req, res) {
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
export default updateName