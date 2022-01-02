import  axios from 'axios';
import { useState } from 'react';

/* ----------------- 액션 타입 ------------------------ */

const PUSH = "join/PUSH"
/* ----------------- 액션 생성 함수 -------------------- */




/* ----------------- 모듈의 초기 상태 ------------------ */
const memberState = [{id:"",
                      pw:"",
                      pwchk:"",
                      name:"",
                      email:"",
                      phone:"",
                      allchk:"",
                      nec1:"",
                      nec2:"",
                      sel1:"",
                      sel2:"",
                      sel3:"",}];

/* ----------------- 리듀서 ---------------------------- */

export default function product (state = memberState,action) {

  
  /* eslint-disable-next-line default-case*/
  switch(action.type) {
    case PUSH: {

      let copy = [...state];
      copy.push(action.payload);

      
      return copy;
    }

    default:
      return state 

    
  }

  
  

  
  
}

