import { UserModel } from './model.js'
import { compareHash } from '../../utils/hashString.js'

/**
 *
 * @param {string} userId
 * @returns {Promise<boolean>}
 */
export async function existUser (userId) {
  try {
    const user = await UserModel.findById(userId)
    if (!user) return false

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

/**
 *
 * @param {string} username
 * @returns {Promise<boolean>}
 */
export async function usernameIsAvailable (username) {
  try {
    return !!(await UserModel.findOne({ username }))
  } catch (error) {
    console.log(error)
    return false
  }
}

/**
 *
 * @param {string} username
 * @param {string} password
 * @returns {Promise<User>}
 */
export async function createNewUser (username, password) {
  if (!username || username.length === 0) throw new Error('Username is required')
  if (!password || password.length === 0) throw new Error('Password is required')

  if (await usernameIsAvailable(username)) throw new Error('Username is not available')

  try {
    const newUser = new UserModel({
      username,
      password
    })

    if (!newUser) throw new Error('Error creating new user')

    const user = await newUser.save()

    return user
  } catch (error) {
    console.log(error)
  }
}

/**
 *
 * @param {string} username
 * @param {string} password
 * @returns {Promise<User>}
 */
export async function getUser (username, password) {
  try {
    const user = await UserModel.findOne({ username })

    if (!user) throw new Error('User does not exist')

    const isPasswordCorrect = await compareHash(password, user.password)

    if (!isPasswordCorrect) throw new Error('Password does not match')

    return user
  } catch (error) {
    console.log(error)
  }
}
