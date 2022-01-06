import {all, fork, takeLatest,put, takeEvery,call} from 'redux-saga/effects';
import {USER_FAILURE, USER_REQUEST, USER_SUCCESS} from '../modules/join'
import { authService, firestore } from "../firebase";


let user_data = firestore.collection("users");
let user_list = [];

const user_db =()=>{
  user_data.get()
  .then((docs)=>{
    docs.forEach((doc)=>{
      user_list.push({id: doc.id,...doc.data()})
    })
  })
  return user_list;
}
        

function* loadUser() {

  try {
    yield call(user_db);
    yield put({ type: USER_SUCCESS, payload: user_list});
   
  } catch (e) {
    yield put({ type: USER_FAILURE, payload:e});
  }
}



export default function* userSaga () {
  
  yield takeEvery(USER_REQUEST,loadUser)
  
}