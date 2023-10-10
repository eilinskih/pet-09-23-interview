import { CurrenciesState } from '../types/currencies'

export const baseUrl = process.env.REACT_APP_API_URL
export const binanceSocket = process.env.REACT_APP_API_BINANCE_SOCKET

export const apiUrls = {
  protected: {
    user: {
      me: '/users/me',
      uploadPhoto: '/users/upload-photo',
      deletePhoto: '/users/delete-photo'
    }
  },
  public: {
    login: '/users/login',
    home: '/'
  }
}

export const getTradePair = (pair: keyof CurrenciesState) => `${pair}usdt@trade`
