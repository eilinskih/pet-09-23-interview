import { createAction } from '@reduxjs/toolkit'
import { API_CALL_FAILURE } from './types/api'

export const apiCallFailure = createAction<string>(API_CALL_FAILURE)
