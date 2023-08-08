import mongoose from 'mongoose'
const schema = mongoose.Schema;

const cardSchema = new schema({
  cardNumber: {
    type: String
  },
  monthAndYear: {
    type: String
  },
  securityCode: {
    type: String
  },
  zipCode: {
    type: String
  },
  cardImage: {
    type: String
  }
})

const card = mongoose.model('cards', cardSchema);
export default card

