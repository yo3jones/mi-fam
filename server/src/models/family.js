import { Schema } from 'mongoose';

export default new Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  display: {
    type: String,
    required: true,
  },
  userIds: {
    type: [Schema.Types.ObjectId],
  },
});
