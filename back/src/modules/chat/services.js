import { compareHash } from '../../utils/hashString.js'
import { existMessage } from '../messages/services.js'
import { ChatModel } from './model.js'

/**
 *
 * @param {string} chatName
 * @param {string} password
 * @returns {Promise<Chat>}
 */
export async function getChat (chatName, password) {
  if (!chatName || chatName.length === 0) throw new Error('Chat chatName is required')
  if (!password || password.length === 0) throw new Error('Chat password is required')

  try {
    const chat = await ChatModel.findOne({ chatName }).populate('messages').populate('creator')

    if (!chat) throw new Error('Chat does not exist')

    const isMatch = await compareHash(password, chat.password)

    if (!isMatch) throw new Error('Chat password does not match')

    return chat
  } catch (error) {
    console.log(error)
  }
}

/**
 * @param {string} userId
 * @param {string} name
 * @param {string} password
 * @returns {Promise<Chat>}
 */
export async function createNewChat (userId, chatName, password) {
  if (!userId || userId.length === 0) throw new Error('User ID is required')
  if (!chatName || chatName.length === 0) throw new Error('Chat chatName is required')
  if (!password || password.length === 0) throw new Error('Chat password is required')

  try {
    const newChat = new ChatModel({
      creator: userId,
      chatName,
      password
    })

    if (!newChat) throw new Error('Error creating new chat')

    const chat = await newChat.save()

    return chat
  } catch (error) {
    console.log(error)
  }
}

/**
 *
 * @param {string} chatId
 * @returns {Promise<boolean>}
 */
export async function existChat (chatId) {
  try {
    const chat = await ChatModel.findById(chatId)
    if (!chat) return false

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

/**
 *
 * @param {string} chatId
 * @param {string} messageId
 * @returns {Promise<Chat>}
 */
export async function addMessageToChat (chatId, messageId) {
  if (!chatId || chatId.length === 0) throw new Error('Chat ID is required')
  if (!messageId || messageId.length === 0) throw new Error('Message ID is required')

  if (!existChat(chatId)) throw new Error('Chat does not exist')
  if (!existMessage(messageId)) throw new Error('Message does not exist')

  try {
    return await ChatModel.update({ _id: chatId }, { $push: { messages: messageId } })
  } catch (error) {
    console.log(error)
  }
}
