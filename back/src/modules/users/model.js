import { model, Schema } from 'mongoose'
import { hashText } from '../../utils/hashString.js'

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

UserSchema.pre('save', async function (next) {
  const user = this

  if (!user.isModified('password')) return next()

  const hash = await hashText(user.password)

  user.password = hash
  next()
})

export const UserModel = model('User', UserSchema)
