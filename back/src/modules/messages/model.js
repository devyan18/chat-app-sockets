import { model, Schema, Types } from 'mongoose'

const MessageSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export const MessageModel = model('Message', MessageSchema)
