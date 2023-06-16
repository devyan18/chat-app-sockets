import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10

/**
 *
 * @param {string} text
 *
 * @returns {Promise<string>}
 */
export async function hashText (text) {
  return await bcrypt.hash(text, SALT_ROUNDS)
}

/**
 *
 * @param {string} text
 * @param {string} hashedText
 *
 * @returns {Promise<boolean>}
 */
export async function compareHash (text, hashedText) {
  return await bcrypt.compare(text, hashedText)
}
