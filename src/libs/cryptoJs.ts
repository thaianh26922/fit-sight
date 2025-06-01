import * as CryptoJS from 'crypto-js'

import logger from './logger'

/**
 * Encrypts any data (object, string, number, etc.) using AES encryption.
 * @param data - The data to encrypt (can be string, object, or number).
 * @returns Encrypted data as a string.
 */
export const encodeData = (data: any): string => {
  try {
    const serializedData = JSON.stringify(data) // Convert data to string
    const encryptedData = CryptoJS.AES.encrypt(serializedData, 'ZyyDmMGAZvDzbgfKhPRFpgnLqvHGM49W').toString()
    return encryptedData
  } catch (error) {
    logger.error('Error encrypting data:', error)
    throw new Error('Failed to encode data')
  }
}

/**
 * Decrypts AES encrypted data back to its original form.
 * @param encryptedData - The encrypted string.
 * @returns The original data (parsed as JSON or raw string).
 */
export const decodeData = <T>(encryptedData: string): T | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, 'ZyyDmMGAZvDzbgfKhPRFpgnLqvHGM49W')
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8)
    return JSON.parse(decryptedString) as T // Parse JSON to reconstruct original data
  } catch (error) {
    logger.error('Error decrypting data:', error)
    return null
  }
}
