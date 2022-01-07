import {useRef} from "react"

function Login(props) {

	const loginModal = useRef();

  return(
    <div ref={loginModal} onClick={(e)=>{
      if(loginModal.current === e.target) {
        props.setModal(false)
      } 
    }} className="Background">
      <div className="login-container">
        <div className="loginTitle-container">
          <p className="loginTitle">로그인</p>
          <button className="loginCloseBtn" onClick={()=>{props.setModal(false)}}><img src="./img/close.png"/></button>
        </div>
        <div className="loginInput-container">
          <input type="text" className="loginID" placeholder="아이디"></input>
          <input type="password" className="loginPW" placeholder="패스워드"></input>
        </div>
        <div className="loginBtn-container">
          <button className="login-btn">로그인</button>
          <button className="signup-btn">회원가입</button>
        </div>
      </div>
    </div>
  )





  
}


export default Login