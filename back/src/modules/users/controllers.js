import { Router } from 'express'
import { getUser, createNewUser } from './services.js'

const userRouter = Router()

userRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  try {
    const user = await getUser(username, password)

    if (!user) {
      return response.status(404).json({ message: 'User does not exist' })
    }

    return response.status(200).json(user)
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: error.message })
  }
})

userRouter.put('/', async (request, response) => {
  const { username, password } = request.body

  try {
    const user = await createNewUser(username, password)

    if (!user) {
      return response.status(500).json({ message: 'Error creating new user' })
    }

    return response.status(201).json(user)
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: error.message })
  }
})

export { userRouter }
