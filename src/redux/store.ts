import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducer'
import { customMiddleware } from './middlewares/authorizeMiddleware'
import { persistStore } from 'redux-persist'

export const sagaMiddleware = createSagaMiddleware()
export const wsRootSaga = createSagaMiddleware()

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(sagaMiddleware)
    .concat(wsRootSaga)
    .concat(customMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
