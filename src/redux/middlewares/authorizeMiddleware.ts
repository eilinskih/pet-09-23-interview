import { type Middleware } from 'redux'
import { API_CALL_FAILURE } from '../types/api'
import { resetUserData, setIsAuthorized } from '../reducer/user'

export const customMiddleware: Middleware = (api) => (next) => (action) => {
  next(action)

  if (action.type !== API_CALL_FAILURE) {
    return
  }

  const unauthorized = action.payload.toString().includes('401') ||
  action.payload.toString().includes('403')
  if (unauthorized) {
    api.dispatch(setIsAuthorized(false))
    api.dispatch(resetUserData())

    console.log('resultMW', action.payload)
  }
}
