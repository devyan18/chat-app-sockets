import { Router } from 'express'

import { getChat, createNewChat, addMessageToChat } from './services.js'

const chatRouter = Router()

chatRouter.post('/', async (request, response) => {
  const { chatName, password } = request.body

  try {
    const chat = await getChat(chatName, password)

    if (!chat) {
      return response.status(404).json({ message: 'Chat does not exist' })
    }

    return response.status(200).json(chat)
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: error.message })
  }
})

chatRouter.put('/', async (request, response) => {
  const { userId, chatName, password } = request.body

  try {
    const chat = await createNewChat(userId, chatName, password)

    if (!chat) {
      return response.status(500).json({ message: 'Error creating new chat' })
    }

    return response.status(201).json(chat)
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: error.message })
  }
})

chatRouter.patch('/', async (request, response) => {
  const { chatId, messageId } = request.body

  try {
    const chat = await addMessageToChat(chatId, messageId)

    if (!chat) {
      return response.status(500).json({ message: 'Error adding message to chat' })
    }

    return response.status(201).json(chat)
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: error.message })
  }
})

export { chatRouter }
