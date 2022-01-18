import  axios from 'axios';

/* ----------------- 액션 타입 ------------------------ */

export const PRODUCT_REQUEST =  'product/PRODUCT_REQUEST'; 
export const PRODUCT_SUCCESS =  'product/PRODUCT_SUCCESS'; 
export const PRODUCT_FAILURE =  'product/PRODUCT_FAILURE'; 

export const SORT_POPU = 'product/SORT_POPU';
const SORT_DESC = 'product/SORT_DESC';
const SORT_ASC  = 'product/SORT_ASC';




/* ----------------- 액션 생성 함수 -------------------- */



export const product_req = (payload) =>{
  return {
    type : PRODUCT_REQUEST,
    payload,
  }
}


/* ----------------- 모듈의 초기 상태 ------------------ */
const productState = [];

/* ----------------- 리듀서 ---------------------------- */

export default function product (state = productState,action) {

    // eslint-disable-next-line default-case
    switch(action.type) {
  
      case PRODUCT_SUCCESS: 


        return state = action.payload
      
      case SORT_DESC: 
        let copy_d = [...state];
        copy_d.sort(function(a,b) {
          return parseFloat(b.price)-parseFloat(a.price) 
        })
        return copy_d;
      
      case SORT_ASC:
        let copy_a = [...state];
        copy_a.sort(function(a,b) {
          return parseFloat(a.price)-parseFloat(b.price) 
        })
        return copy_a;    

      case SORT_POPU:
        
        state = action.payload
        let copy_p = [...state];
        copy_p.sort(function(a,b) {
          return parseFloat(a.id)-parseFloat(b.id) 
        })

        copy_p.sort(function(a,b) {
          return parseFloat(a.stock)-parseFloat(b.stock) 
        })
        return copy_p;        

      default:
        return state
    }

  
}

