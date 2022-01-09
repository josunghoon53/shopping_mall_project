import {useEffect, useRef, useState} from "react"
import { authService } from "../firebase";

function Profil(props) {



  const profilModal = useRef()

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = ({target}) =>{
    
  }
  



  return(
    <div  ref={profilModal} className="profil-container">
      <div className="tri"/>
      <div className="profil-top">
        <img className = "profil-img" src="./img/user.png"/>
        <div className="profil-infobox">
          <p className="profil-name">{props.dpname}</p>
          <p className="profil-logout" onClick={()=>{
            authService.signOut().then(()=>{
              props.setProfil(false)
            })
          }}>로그아웃</p>
        </div>
      </div>
    </div>
  )
}

export default Profil