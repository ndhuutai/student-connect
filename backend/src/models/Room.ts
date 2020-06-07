import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  messageHistory: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      text: String,
    },
  ],
  alias: String,
});

export const Room = mongoose.model('Room', roomSchema);
