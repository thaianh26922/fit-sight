import { TAuth } from '@src/modules'

import { validTokenFn } from './jwt'

const SIGNATURE = 'signature'

// Helper to get user from localStorage
export function getStoredAuth(): TAuth | null {
  const storedAuth = typeof window !== 'undefined' ? localStorage.getItem(SIGNATURE) : ''
  return storedAuth ? JSON.parse(storedAuth) : null
}

export function checkAuth(): string {
  const signature = getStoredAuth()
  const accessToken = signature ? signature.accessToken : null
  return validTokenFn(accessToken)
}

export function setStoredAuth(auth: TAuth): void {
  localStorage.setItem(SIGNATURE, JSON.stringify(auth))
}

export function clearStoredAuth(): void {
  localStorage.removeItem(SIGNATURE)
}

// Set localStorage common
export function getLocalStored(key: string): any {
  const stored = typeof window !== 'undefined' ? localStorage.getItem(key) : ''
  return stored ? JSON.parse(stored) : null
}

export function setLocalStored(key: string, data: any): void {
  localStorage.setItem(key, JSON.stringify(data))
}

export function clearLocalStored(key: string): void {
  localStorage.removeItem(key)
}
