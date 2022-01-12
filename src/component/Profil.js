import {useEffect, useRef, useState} from "react"
import { authService } from "../firebase";
import { useHistory } from "react-router-dom";

function Profil(props) {



  const profilModal = useRef()
  const history = useHistory();

  const closeModal = (e)=>{
   
    if(!profilModal.current.contains(e.target)){
      props.setProfil(false)
    }
     
  }

  useEffect(()=>{
    window.addEventListener('click',closeModal);
    
    return(()=>{
      window.removeEventListener('click',closeModal);
    })
  },[])

  return(
    <div  ref={profilModal}  className="profil-container">
      <div className="tri"/>
      <div className="profil-top">
        <img className = "profil-img" src="./img/user.png"/>
        <div className="profil-infobox">
          <p className="profil-name">{localStorage.getItem("login_name")}</p>
          <p className="profil-logout" onClick={()=>{
            authService.signOut().then(()=>{
              props.setProfil(false)
              localStorage.removeItem("login_name");
              localStorage.setItem("장바구니",JSON.stringify([]))
              history.push("/")
            })
          }}>로그아웃</p>
        </div>
      </div>
    </div>
  )
}

export default Profil