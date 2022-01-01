import  axios from 'axios';
import { useState } from 'react';

/* ----------------- 액션 타입 ------------------------ */

const ID_CHK = "join/ID_CHK"
const PW_CHK = "join/PW_CHK"

/* ----------------- 액션 생성 함수 -------------------- */




/* ----------------- 모듈의 초기 상태 ------------------ */
const memberState = [{id:"asdf",
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

  

  // eslint-disable-next-line default-case
  switch(action.type){
   
    case ID_CHK: {


      let chk = action.payload

     
      let doubleChk = state.find(el=>{
        return el.id === chk
      })

      if(doubleChk !== undefined) {
        alert("중복된 아이디입니다.");
      } 
      else {
        
        
      }
      
      break;
    }

    
    case PW_CHK: {
     
      
      let chk = action.payload;

      
      break;

    }

    
  }

  return state;
  
  
}

