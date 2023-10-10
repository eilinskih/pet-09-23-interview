import CryptoJS from 'crypto-js'

const ENCRYPTION_KEY = 'pet-app-key'

export const encryptString = (inbound: string) => CryptoJS.AES
  .encrypt(inbound, ENCRYPTION_KEY).toString()

export const decryptString = (outbound: string) => {
  const bytes = CryptoJS.AES.decrypt(outbound, ENCRYPTION_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}
