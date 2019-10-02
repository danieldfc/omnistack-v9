import { Schema, model } from 'mongoose';

const SpotSchema = new Schema({
  thumbnail: String,
  company: String,
  price: Number,
  techs: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  toJSON: {
    virtuals: true,
  },
});

SpotSchema.virtual('thumbnail_url').get(function() {
  return `${process.env.APP_URL}/files/${this.thumbnail}`
})

export default model('Spot', SpotSchema);

