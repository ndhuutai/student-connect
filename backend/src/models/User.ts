import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: mongoose.Types.ObjectId,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  alias: {
    type: String,
  },
  status: Number,
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
  ],
});

export const User = mongoose.model('User', userSchema);
