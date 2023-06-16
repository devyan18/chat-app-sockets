import { MessageModel } from './model.js'
import { existChat, addMessageToChat } from '../chat/services.js'

/**
 * @param { String } userId is the user ID
 * @param { string } messageText is the message text
 * @returns { Promise<Message> } returns a promise with the new message
 */
export async function createNewMessage (chatId, userId, messageText) {
  if (!userId || userId.length === 0) throw new Error('User ID is required')
  if (!messageText || messageText.length === 0) throw new Error('Message text is required')

  if (!existChat(chatId)) throw new Error('Chat does not exist')

  try {
    const newMessage = new MessageModel({
      user: userId,
      message: messageText
    })

    if (!newMessage) throw new Error('Error creating new message')

    const message = await newMessage.save()

    if (!message) throw new Error('Error saving new message')

    await addMessageToChat(chatId, message._id)

    return message
  } catch (error) {
    console.log(error)
  }
}

/**
 *
 * @param {string} messageId
 * @returns {Promise<boolean>}
 */
export async function existMessage (messageId) {
  try {
    return !!(await MessageModel.findById(messageId))
  } catch (error) {
    console.log(error)
    return false
  }
}
