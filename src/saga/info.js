import {all, fork, takeLatest,put, takeEvery,call} from 'redux-saga/effects';
import {SET_USER_SUCCESS,SET_USER_FAILURE, SET_USER_REQUEST} from '../modules/info'
import { authService, firestore } from "../firebase";
import { useState } from 'react';

let userinfo = [];

const authObserver = () => {
  authService.onAuthStateChanged((user)=>{
    if(user) {
      userinfo.push(true)
    }
  })

  
}

        

function* currentUser() {

  try {

    yield call(authObserver);
    yield put({ type: SET_USER_SUCCESS,  payload: userinfo });
    
   
  } catch (e) {
    yield put({ type: SET_USER_FAILURE});
  }
}



export default function* setUserSaga () {
  
  yield takeEvery(SET_USER_REQUEST,currentUser)
  
}