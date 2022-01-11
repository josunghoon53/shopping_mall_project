import  axios from 'axios';
import { firestore, getAuth } from '../firebase';
import product from './product';


/* ----------------- 액션 타입 ------------------------ */

const PLUS =  'basket/PLUS'; 
const MINUS =  'basket/MINUS'; 
const DELETE =  'basket/DELETE'; 



/* ----------------- 모듈의 초기 상태 ------------------ */
if(localStorage.getItem("장바구니") === null) {
  localStorage.setItem("장바구니",JSON.stringify([]));
}

let basketState = JSON.parse(localStorage.getItem("장바구니"))

/* ----------------- 리듀서 ---------------------------- */

export default function basket (state = basketState,action) {

  

    
    switch(action.type) {

      case PLUS:
      {
        let copy = [...state];
        let findIndx = state.findIndex( el => {
          return el.id === action.payload.id 
        })
        
        if(findIndx >=0){  
          if(copy[findIndx].stock === copy[findIndx].quan){
            alert("더 이상 재고가 없습니다");
            localStorage.setItem("장바구니",JSON.stringify(copy))
          } else {
            copy[findIndx].quan++;
            localStorage.setItem("장바구니",JSON.stringify(copy))
            
          
          }
          return copy;

        } else{
            copy.push(action.payload);
            localStorage.setItem("장바구니",JSON.stringify(copy))
            
          }
          return copy;
      }

      case MINUS: 
      
      {
        let copy = [...state];
        let findIndx = state.findIndex( el => {
          return el.id === action.payload.id 
        })
                
        
        if(copy[findIndx].quan !== 1){
        copy[findIndx].quan--;
        localStorage.setItem("장바구니",JSON.stringify(copy))
        }
        return copy;
      }

      case DELETE: 
      {
        if(action.payload.length !== 0){
          if(window.confirm("장바구니 목록을 삭제하시겠습니까?")===true){
            action.payload.map((el,idx)=>{
              let copy = state.filter((e)=>e.id !== action.payload[idx])
              state = [...copy]
          })   

          localStorage.setItem("장바구니",JSON.stringify(state))
          }  
        } 
      }
      
    
      // eslint-disable-next-line no-fallthrough
      default:
        return state 
    }

    
}

