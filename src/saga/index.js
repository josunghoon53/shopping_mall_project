
import {all, call} from 'redux-saga/effects';
import user from './user'
import basket from './basket'
import product from './product'



export default function* rootSaga() {
  yield all ([
    call(user),
    call(basket),
    call(product)

  ])
}