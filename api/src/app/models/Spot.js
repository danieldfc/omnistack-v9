import { Schema, model } from 'mongoose';

const SpotSchema = new Schema({
  thumbnail: String,
  company: String,
  price: String,
  techs: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default model('Spot', SpotSchema);

