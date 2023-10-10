import { takeLatest, all, put } from 'redux-saga/effects'
import {
  deleteUserPhoto,
  fetchUserData,
  loginUser,
  setIsAuthorized,
  setUserData,
  setUserLoaders,
  setUserPhoto,
  uploadUserPhoto
} from '../reducer/user'
import { type PayloadAction } from '@reduxjs/toolkit'
import { CredentialsData, type UserData } from '../../types'
import { apiCallFailure } from '../apiActions'

function* fetchUserSaga () {
  try {
    const userData: UserData =
    yield fetch('http://localhost:3001/users/me', {
      method: 'GET',
      credentials: 'include'
    }).then((response) => {
      if (response.status < 400) {
        return response.json()
      } else { throw new Error(response.status.toString()) }
    })
    yield put(setUserData(userData))
  } catch (e) {
    yield put(apiCallFailure(e as string))
    console.log(e)
  }
}

function* loginUserSaga (action: PayloadAction<CredentialsData>) {
  try {
    const userData: UserData =
    yield fetch('http://localhost:3001/users/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(action.payload),
      credentials: 'include'
    }).then((response) => {
      if (response.status < 400) {
        return response.json()
      } else {
        throw new Error(response.status.toString())
      }
    })
    yield put(setIsAuthorized(true))
    yield put(setUserData(userData))
  } catch (e) {
    yield put(apiCallFailure(e as string))
    console.log(e)
  }
}

function* uploadUserPhotoSaga (action: PayloadAction<FormData>) {
  try {
    yield put(setUserLoaders({ value: true, loaderKey: 'photo' }))

    const updatedPhotoUrl: { photo: string } =
    yield fetch('http://localhost:3001/users/update-photo',
      {
        method: 'POST',
        credentials: 'include',
        body: action.payload
      }).then((response) => {
      if (response.status < 400) {
        return response.json()
      } else { throw new Error(response.status.toString()) }
    })

    yield put(setUserPhoto({ photo: updatedPhotoUrl.photo }))
  } catch (e) {
    yield put(apiCallFailure(e as string))
    console.log(e)
  } finally {
    yield put(setUserLoaders({ value: false, loaderKey: 'photo' }))
  }
}

function* deleteUserPhotoSaga () {
  try {
    yield put(setUserLoaders({ value: true, loaderKey: 'photo' }))

    yield fetch('http://localhost:3001/users/delete-photo',
      {
        method: 'DELETE',
        credentials: 'include'
      }).then(response => {
      if (response.status >= 400) {
        throw new Error(response.status.toString())
      }
    })

    yield put(setUserPhoto({ photo: null }))
  } catch (e) {
    yield put(apiCallFailure(e as string))
    console.log(e)
  } finally {
    yield put(setUserLoaders({ value: false, loaderKey: 'photo' }))
  }
}

export function* rootSagaUser () {
  yield all([
    takeLatest(fetchUserData, fetchUserSaga),
    takeLatest(uploadUserPhoto, uploadUserPhotoSaga),
    takeLatest(deleteUserPhoto, deleteUserPhotoSaga),
    takeLatest(loginUser, loginUserSaga)
  ])
}
