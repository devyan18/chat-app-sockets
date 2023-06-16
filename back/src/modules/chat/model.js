import { model, Schema } from 'mongoose'
import { hashText } from '../../utils/hashString.js'

const ChatSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  chatName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }]
}, {
  timestamps: true
})

ChatSchema.pre('save', async function (next) {
  const chat = this

  if (!chat.isModified('password')) return next()

  const hash = await hashText(chat.password)

  chat.password = hash
  next()
})

export const ChatModel = model('Chat', ChatSchema)
