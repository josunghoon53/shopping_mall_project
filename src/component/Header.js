import { useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, firestore,getAuth } from '../firebase';



function Header(props) {
  
     
    const history = useHistory();
    const user_db = firestore.collection("users");


    return(  
      <div>
       
        <div className='member-container'>
          
          {props.isLoggedIn === false
            ? <div className='mem login'onClick={()=>{props.setModal(true)}}>LOGIN</div>
            : LoggedIn()
          }
          <div className='mem join' onClick={()=>{history.push("/join")}}>JOIN</div>
          <div className='mem cart' onClick={()=>{ 
          
              console.log(props.observer)
          
         }}>CART</div>
        </div>
        
        <div className='logo-container' onClick={()=>{history.push("/")}}>
          <div className='logo-box'>
            <img className='logo-img' src= "/img/95logo.png" alt=""/>
            <div className='logo-title'>Boardshop</div>
          </div>

        </div>
        
        <div className={props.headon === false ? "navbar" : "navbar-fixed" } >
          <div className='inner' >
            <ul className = "nav-container">
              <li className='menu' onClick={()=>{history.push("/product")}}>롱보드</li>  
              <li className='menu'>스케이드보드</li>
              <li className='menu'>의류</li>
            </ul>
          </div>
        </div>
     </div>
    )


    function LoggedIn() {
      return (
        <div className='loginuser-container' onClick={()=>{props.setProfil(!props.profil)}}>
          <div className='loginuser-box'>
            <img src='./img/user.png'/>
            <div className='loginuser-dpname'>{props.dpname}</div>
          </div>
        </div>
      )
    }
  

   
    
  }



  export default Header