import { createAction } from '@reduxjs/toolkit'
import { WS_CONNECT, WS_DISCONNECT } from '../types/wsConnection'
import { CurrenciesState } from '../../types/currencies'

export const wsDisconnectData = createAction(WS_DISCONNECT)
export const wsConnectData = createAction<keyof CurrenciesState>(WS_CONNECT)
