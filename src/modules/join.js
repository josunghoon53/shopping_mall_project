/* ----------------- 액션 타입 ------------------------ */

export const USER_REQUEST = "join/USER_REQUEST"
export const USER_SUCCESS = "join/USER_SUCCESS"
export const USER_FAILURE = "join/USER_FAILURE"
/* ----------------- 액션 생성 함수 -------------------- */

export const user_req = (payload) =>{
  return {
    type : USER_REQUEST,
    payload,
  }
}


/* ----------------- 모듈의 초기 상태 ------------------ */
const memberState = [];

/* ----------------- 리듀서 ---------------------------- */

export default function join (state = memberState,action) {

  
  /* eslint-disable-next-line default-case*/
  switch(action.type) {

    case USER_SUCCESS: {

      

      return action.payload
    }

    case USER_FAILURE: {
      return state
    }

    default:
      return state   
  }
  
}

