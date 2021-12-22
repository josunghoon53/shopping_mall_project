import  axios from 'axios';

/* ----------------- 액션 타입 ------------------------ */

const SET =  'product/SET'; 
const SORT_DESC = 'product/SORT_DESC';
const SORT_ASC = 'product/SORT_ASC';


/* ----------------- 액션 생성 함수 -------------------- */


export const getData = async() =>{
  const product = await axios.get("/Data.json");
  return {
    type : SET,
    payload : product.data
  }
}


/* ----------------- 모듈의 초기 상태 ------------------ */
const productState = [{}];

/* ----------------- 리듀서 ---------------------------- */

export default function product (state = productState,action) {

    // eslint-disable-next-line default-case
    switch(action.type) {
  
      case SET: 

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

      default:
        return state
    }

  
}

