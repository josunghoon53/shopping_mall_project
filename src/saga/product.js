import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';
import {PRODUCT_REQUEST,PRODUCT_SUCCESS,PRODUCT_FAILURE} from '../modules/product'


        

function* loadProduct() {

  try {
    let result = yield axios.get('/Data.json');
    yield put({ type: PRODUCT_SUCCESS, payload: result.data});
   
  } catch (e) {
    yield put({ type: PRODUCT_FAILURE, payload:e});
  }
}



export default function* productSaga () {
  
  yield takeEvery(PRODUCT_REQUEST,loadProduct)
  
}