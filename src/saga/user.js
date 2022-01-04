import {all, fork, takeLatest,put} from 'redux-saga/effects';
import {SET,FIN} from '../modules/join'



function* load() {
  try {
 
    yield put({
      type:FIN
    })
  } catch (e) {
    console.error(e)
  }
}



function* userObserver() {
  
  yield takeLatest(SET, load)
}



export default function* userSaga () {
  yield all([
    fork(userObserver),
  ]);
  
}