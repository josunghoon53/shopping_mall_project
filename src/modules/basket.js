
import { firestore, getAuth } from '../firebase';


/* ----------------- 액션 타입 ------------------------ */

const PLUS =  'basket/PLUS'; 
const MINUS =  'basket/MINUS'; 
const DELETE =  'basket/DELETE'; 

export const BASKET_SET = 'basket/SET'
export const BASKET_SUCCESS = 'basket/SUCCESS'
export const BASKET_FAILURE = 'basket/FAILURE'


/* ----------------- 액션생성함수 ------------------ */


export const basket_req = (payload) =>{
  return {
    type : BASKET_SET,
    payload,
  }
}



/* ----------------- 모듈의 초기 상태 ------------------ */
if(localStorage.getItem("장바구니") === null) {
  localStorage.setItem("장바구니",JSON.stringify([]));
}


let basketState = JSON.parse(localStorage.getItem("장바구니")) 

/* ----------------- 리듀서 ---------------------------- */

export default function basket (state = basketState,action) {

  
    function basket_db(copy){
      if(getAuth.currentUser !== null) {
        copy.map((el,idx)=>{
          firestore.collection("users").doc(getAuth.currentUser.uid)
          .collection("basket").doc(copy[idx].id).set(
            {id: copy[idx].id, name: copy[idx].name, quan: copy[idx].quan, price: copy[idx].price,
                img:copy[idx].img, stock : copy[idx].stock})
        })
      }
    }



    switch(action.type) {

      case BASKET_SUCCESS : {
        localStorage.setItem("장바구니",JSON.stringify(action.payload))
        state =action.payload
        return state
      }



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
            basket_db(copy);
          } else {
            copy[findIndx].quan++;
            localStorage.setItem("장바구니",JSON.stringify(copy))  
            basket_db(copy);
          }


          return copy;

        } else{
            copy.push(action.payload);
            localStorage.setItem("장바구니",JSON.stringify(copy))
            basket_db(copy);
          
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
        basket_db(copy);
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

              if(getAuth.currentUser !== null) {
                firestore.collection("users").doc(getAuth.currentUser.uid)
                .collection("basket").doc(action.payload[idx]).delete()
              }
      
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

