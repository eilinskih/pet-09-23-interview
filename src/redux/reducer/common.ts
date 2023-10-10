import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CurrenciesState } from '../../types/currencies'
import { RootState } from '../store'

export const pricesSlice = createSlice({
  name: 'prices',
  initialState: {
    btc: { price: 0, iconUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=026', isLive: false },
    eth: { price: 0, iconUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=026', isLive: false },
    ltc: { price: 0, iconUrl: 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=026', isLive: false },
    bnb: { price: 0, iconUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=026', isLive: false }
  } as CurrenciesState,
  reducers: {
    setCoinPrice:
    (state, { payload }: PayloadAction<{ coinKey: keyof CurrenciesState, price: number }>) => {
      state[payload.coinKey].price = payload.price
    }
  }
})

export const { setCoinPrice } = pricesSlice.actions

export const selectCurrencies = (state: RootState) => state.common

export default pricesSlice.reducer
