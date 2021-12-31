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
      const speChr = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
      const kor =  /[ㄱ-ㅎㅏ-ㅣ가-힣]/gi; 
      const num = /^[0-9]*$/gi;
      const corrID = /^[a-z]+[a-z0-9]{3,19}/gi;

      let chk = action.payload
      let list = [];
     
      let doubleChk = state.find(el=>{
        return el.id === chk
      })

      if(doubleChk !== undefined) {
        alert("중복된 아이디입니다.");
      } 
      else {
        
        if(corrID.test(chk)) {
          alert("사용가능한 아이디입니다.");
        }

        else {

          if(chk.search(/\s/) !== -1) {
            list.push("공백은 포함할 수 없습니다");
          }
          if(speChr.test(chk)) {
            list.push("특수문자는 포함할 수 없습니다");
          }
    
          if(kor.test(chk)) {
            list.push("한글은 포함할 수 없습니다");
          }

          if(num.test(chk)) {
            list.push("숫자로 시작하거나 숫자로만 아이디를 만들 수 없습니다");
          }
    
          if(chk.length <4 || chk.length > 20) {
            list.push("글자수는 4~20자 사이여야 합니다.");
          }
          
          alert(list.join("\n"));
    
        }
 
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

