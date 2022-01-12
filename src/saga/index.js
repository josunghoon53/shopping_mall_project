
import {all, call} from 'redux-saga/effects';
import user from './user'
import basket from './basket'



export default function* rootSaga() {
  yield all ([
    call(user),
    call(basket)

  ])
}