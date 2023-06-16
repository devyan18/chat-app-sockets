import { Router } from 'express'
import { createNewMessage } from './services.js'

const messageRouter = Router()

messageRouter.put('/', async (request, response) => {
  const { chatId, userId, messageText } = request.body

  try {
    const message = await createNewMessage(chatId, userId, messageText)

    if (!message) {
      return response.status(500).json({ message: 'Error creating new message' })
    }

    return response.status(201).json(message)
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: error.message })
  }
})

export { messageRouter }
