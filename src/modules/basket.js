import  axios from 'axios';
import product from './product';


/* ----------------- 액션 타입 ------------------------ */

const PLUS =  'basket/PLUS'; 
const MINUS =  'basket/MINUS'; 
const GET_BASKET =  'basket/GET'; 


/* ----------------- 모듈의 초기 상태 ------------------ */
const basketState = [];

/* ----------------- 리듀서 ---------------------------- */

export default function basket (state = basketState,action) {

    //장바구니와 데이터안에 동일 인덱스 찾기
    let findIndx = state.findIndex( el => {
      return el.id === action.payload.id 
    })
    
    switch(action.type) {

      case PLUS:
      if(findIndx >=0){
      let copy = [...state];
      if(copy[findIndx].stock === copy[findIndx].quan){
        alert("더 이상 재고가 없습니다");
        return copy;
      } else {
        copy[findIndx].quan++;
        return copy;
      }

  
      } else{
      let copy = [...state];
      copy.push(action.payload);
      return copy;
      }

      case MINUS:
        let copy = [...state];

        if(copy[findIndx].quan !== 1){
        copy[findIndx].quan--;
        }
        return copy;

      case GET_BASKET:
         
        return  state



      default:
        return state 
    }

    
}

