import Saved from "../models/SavedEventAndMap.js";

export const postSavedData = async (req, res) => {
  const { userId, photos, name, rating, totalRating, phoneNumber } = req.body;

  try {
    const savedData = new Saved({
      userId,
      photos,
      name,
      rating,
      totalRating,
      phoneNumber,
    });

    await savedData.save();

    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSavedByUserId = async (req, res) => {
  const { userId } = req.body;

  try {
    const savedData = await Saved.find({ userId });

    if (!savedData) {
      return res.status(404).json({ message: "Saved data not found." });
    }

    res.status(200).json([savedData]);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
