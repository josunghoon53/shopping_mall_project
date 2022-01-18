import axios from 'axios';
import {call,put, takeEvery} from 'redux-saga/effects';
import {PRODUCT_REQUEST,SORT_POPU,PRODUCT_FAILURE, PRODUCT_SUCCESS} from '../modules/product'


        

function* loadProduct() {

  try {
    let result = yield axios.get('/Data.json');
    yield put({type: SORT_POPU, payload: result.data});
   
  } catch (e) {
    yield put({ type: PRODUCT_FAILURE, payload:e});
  }
}



export default function* productSaga () {
  
  yield takeEvery(PRODUCT_REQUEST,loadProduct)
  
}