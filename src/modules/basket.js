import  axios from 'axios';

/* ----------------- 액션 타입 ------------------------ */

const SET_BASKET =  'basket/SET'; 
const GET_BASKET =  'basket/GET'; 


/* ----------------- 모듈의 초기 상태 ------------------ */
const basketState = [{}];

/* ----------------- 리듀서 ---------------------------- */

export default function product (state = basketState,action) {

    // eslint-disable-next-line default-case
    switch(action.type) {
      case SET_BASKET:
       
        return state

      case GET_BASKET:
         
        return  state

      default:
        return state 
    }

    
}

