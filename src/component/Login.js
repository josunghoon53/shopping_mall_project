import {useRef, useState} from "react"
import { authService, firestore, getAuth, persis} from "../firebase";
import { useHistory } from "react-router-dom";

function Login(props) {

  const history = useHistory();
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
          <button className="loginCloseBtn" onClick={()=>{props.setModal(false)}}><img src="../img/close.png"/></button>
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
          <button onClick={()=>{loginfuc()}} className="login-btn">로그인</button>
          <button className="signup-btn">회원가입</button>
        </div>
      </div> 
    </div>
  )


    function loginfuc() {
      USER_DB.get().then((docs)=>{
        docs.forEach((doc)=>{
          if(doc.data().user_id === id) {
            authService.signInWithEmailAndPassword(doc.data().email,pw).then((userCredential)=>{
              authService.setPersistence(persis.LOCAL).then(()=>{
                localStorage.setItem("login_name",doc.data().name);
                history.push("/")
                props.setModal(false)
               
              })           
            });
          }
        })
      })

      console.log(props.userbasket)

    }



  
}


export default Login