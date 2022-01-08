/* ----------------- 액션 타입 ------------------------ */

import { authService } from "../firebase"

export const SET_USER_REQUEST = "info/SET_USER_REQUEST"
export const SET_USER_SUCCESS = "info/SET_USER_SUCCESS"
export const SET_USER_FAILURE = "info/SET_USER_FAILURE"

/* ----------------- 액션 생성 함수 -------------------- */

export const setUser = (payload) =>{
  return {
    type : SET_USER_REQUEST,
    payload,
  }
}


/* ----------------- 모듈의 초기 상태 ------------------ */
const currentState = {
  currentUser : null,
  islogin : false,
}

/* ----------------- 리듀서 ---------------------------- */

export default function info (state = currentState,action) {

  
  /* eslint-disable-next-line default-case*/
  switch(action.type) {


    case SET_USER_SUCCESS: {
      return {
        ...state,
        currentUser : authService.currentUser,
        islogin : action.payload,
      }
    }

    case SET_USER_FAILURE: {
      return state   
    }

   
    default:
      return state   
  }
  
}

