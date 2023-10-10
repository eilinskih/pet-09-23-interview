import { type PayloadAction, createAction, createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'

import { type RootState } from '../store'
import {
  DELETE_USER_PHOTO,
  FETCH_USER_REQUEST,
  LOGIN_USER,
  UPLOAD_OR_CHANGE_USER_PHOTO
} from '../types'
import {
  type UserState,
  type LoadersActionPayload,
  type UserData, CredentialsData
} from '../../types'
import { persistReducer } from 'redux-persist'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthorized: false,
    userData: {
      photoUrl: '',
      username: '',
      email: ''
    },
    loaders: {
      photo: false
    }
  } as UserState,
  reducers: {
    setUserData: (state, { payload }: PayloadAction<UserData>) => {
      state.userData = { ...payload }
    },
    resetUserData: (state) => {
      state.userData = {
        photoUrl: '',
        username: '',
        email: ''
      }
    },
    setUserPhoto: (state, { payload }: PayloadAction<{ photo: string | null }>) => {
      state.userData.photoUrl = payload.photo
    },
    setUserLoaders: (state, { payload }: PayloadAction<LoadersActionPayload<'photo'>>) => {
      state.loaders = { ...state.loaders, [payload.loaderKey]: payload.value }
    },
    setIsAuthorized: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthorized = payload
    }
  }
})

export const fetchUserData = createAction(FETCH_USER_REQUEST)
export const uploadUserPhoto = createAction<FormData>(UPLOAD_OR_CHANGE_USER_PHOTO)
export const deleteUserPhoto = createAction(DELETE_USER_PHOTO)
export const loginUser = createAction<CredentialsData>(LOGIN_USER)

export const {
  setUserPhoto,
  setUserData,
  setUserLoaders,
  setIsAuthorized,
  resetUserData
} = userSlice.actions

export const userSelector = (state: RootState) => state.user.userData
export const userLoadersSelector = (state: RootState) => state.user.loaders
export const isAuthorizedSelector = (state: RootState) => state.user.isAuthorized

const usersConfig = {
  key: 'users',
  storage
}

export default persistReducer(usersConfig, userSlice.reducer)
