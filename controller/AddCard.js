import card from "../models/AddCard.js";

export const addCard = async (req, res) => {
  const { cardNumber, monthAndYear, securityCode, zipCode } = req.body

  if (!cardNumber || !monthAndYear || !securityCode || !zipCode) {
    return res
      .status(201)
      .json({ Error: true, msg: "Please enter all fields" });
  }

  try {
    const newCard = new card({
      cardNumber,
      monthAndYear,
      securityCode,
      zipCode,
    });
    console.log("new card", newCard)
    await newCard.save().then((result) => {
      return res.status(201).json({
        newCard,
        msg: "Card Added Successfully",
      });
    });

  }
  catch (error) {
    return console.log(error);
  }
}

export const getCard = async (req, res) => {
  try {
    const cards = await card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const deleteCard = async (req, res) => {
  const { id } = req.body
  try {
    await card.findByIdAndRemove(id).exec();
    res.send('Successfully deleted!');
  } catch (error) {
    console.log(error);
  }
}
