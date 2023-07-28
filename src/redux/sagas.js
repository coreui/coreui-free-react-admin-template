import { all } from 'redux-saga/effects'
import { userNonceSagas } from './modules/userNonce'
import { userSignSagas } from './modules/userSign'

export default function* rootSaga() {
  yield all([userNonceSagas(), userSignSagas()])
}
