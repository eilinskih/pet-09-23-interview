import { END, eventChannel } from 'redux-saga'

import {
  call,
  put,
  race,
  take,
  takeLatest
} from 'redux-saga/effects'
import { binanceSocket, getTradePair } from '../../api/config'
import { CurrenciesState } from '../../types/currencies'
import { setCoinPrice } from '../reducer/common'
import { PayloadAction } from '@reduxjs/toolkit'
import { WS_CONNECT, WS_DISCONNECT } from '../types/wsConnection'

const InitChannel = (pair: keyof CurrenciesState) => {
  const ws = new WebSocket(`${binanceSocket}${getTradePair(pair)}`)

  const channel = eventChannel<any>((emitter) => {
    ws.onopen = () => {
      console.log('ws connected')
    }

    ws.onerror = (error) => {
      console.dir(error)
    }

    ws.onclose = () => {
      emitter(END)
    }

    ws.onmessage = ({ data }) => {
      emitter(setCoinPrice({ price: JSON.parse(data).p, coinKey: pair }))
    }

    // unsubscribe
    return () => {
      ws.close()
    }
  })
  return channel
}

function* wsConnections (action: PayloadAction<keyof CurrenciesState>): any {
  const channel = yield call(
    InitChannel,
    action.payload
  )
  try {
    while (true) {
      const { connectFetch, disconnectData } = yield race({
        connectFetch: take(channel),
        disconnectData: take(WS_DISCONNECT)
      })

      if (disconnectData) {
        channel.close()
      } else {
        yield put(connectFetch)
      }
    }
  } finally {
    console.log('Websocket channel terminated')
  }
}

export function* wsConnectionsWatcher (): any {
  yield takeLatest(WS_CONNECT, wsConnections)
}
