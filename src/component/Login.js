import {useRef, useState} from "react"
import { authService, firestore, persis} from "../firebase";

function Login(props) {


  const USER_DB = firestore.collection("users");
	const loginModal = useRef();
  let [id,setId] = useState();
  let [pw,setPw] = useState(); 

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
          <input type="text" className="loginID" placeholder="아이디" onChange={(e)=>{
            setId(e.target.value)
          }}/>
          <input type="password" className="loginPW" placeholder="패스워드" onChange={(e)=>{
            setPw(e.target.value)
          }}/>
        </div>
        <div className="loginBtn-container">
          <button onClick={()=>{test()}} className="login-btn">로그인</button>
          <button className="signup-btn">회원가입</button>
            <button onClick={()=>{
        console.log(authService.currentUser);
      }}/>
        </div>
      </div>

    
    </div>
  )


    function test() {
      USER_DB.get().then((docs)=>{
        docs.forEach((doc)=>{
          if(doc.data().user_id === id) {
            authService.signInWithEmailAndPassword(doc.data().email,pw).then((userCredential)=>{
              authService.setPersistence(persis.LOCAL).then(()=>{
                console.log(userCredential);
                props.setModal(false)
                props.setIsLoggedIn(true)
              })
           
            });
          }
        })
      })
    }



  
}


export default Login