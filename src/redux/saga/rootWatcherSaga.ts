import { all } from 'redux-saga/effects'
import { rootSagaUser } from './userSaga'

function* rootSaga () {
  yield all([
    rootSagaUser()
  ])
}

export default rootSaga
