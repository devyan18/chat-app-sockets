import { Router } from 'express'
import { chatRouter } from '../modules/chat/controllers.js'
import { userRouter } from '../modules/users/controllers.js'
import { messageRouter } from '../modules/messages/controllers.js'

const v1 = Router()

v1.use('/chat', chatRouter)
v1.use('/user', userRouter)
v1.use('/message', messageRouter)

export { v1 }
