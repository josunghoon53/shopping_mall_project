import {all, fork, takeLatest,put, takeEvery,call} from 'redux-saga/effects';
import {BASKET_SUCCESS,BASKET_SET,BASKET_FAILURE} from '../modules/basket'
import { authService, firestore } from "../firebase";


let basket_data = firestore.collection("users");
let basket_list = [];

const basket_db =()=>{

  basket_data.doc(authService.currentUser.uid)
  .collection("basket").get().then((docs)=>{
      docs.forEach((doc)=>{
      basket_list.push({id: doc.id,...doc.data()})
      localStorage.setItem("장바구니",JSON.stringify(basket_list))
    })          
  })

 
  return basket_list;
 
}
        

function* loadBasket() {

  try {
    yield call(basket_db);
    yield put({ type: BASKET_SUCCESS, payload: basket_list});
   
  } catch (e) {
    yield put({ type: BASKET_FAILURE, payload:e});
  }
}



export default function* basketSaga () {
  
  yield takeEvery(BASKET_SET,loadBasket)
  
}