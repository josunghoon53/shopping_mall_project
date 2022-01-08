
import {all, call} from 'redux-saga/effects';
import user from './user'
import info from './info'


export default function* rootSaga() {
  yield all ([
    call(user),
    call(info),
  ])
}