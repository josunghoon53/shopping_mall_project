import { useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, firestore,getAuth } from '../firebase';



function Header(props) {
  
     
    const history = useHistory();
    const user_db = firestore.collection("users");


    return(  
      <div>
        <div className='member-container'>
          
          {localStorage.getItem("login_name") === null
            ? <div className='mem login'onClick={()=>{props.setModal(true)}}>LOGIN</div>
            : LoggedIn()
          }
          <div className='mem join' onClick={()=>{history.push("/join")}}>JOIN</div>
          <div className='mem cart' onClick={()=>{ 
            console.log( (localStorage.getItem("login_name")))
          
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
      let display_name = localStorage.getItem("login_name")

      return (
        <div className='loginuser-container'>
          <div className='loginuser-box'onClick={()=>{
            props.setProfil(true)
          }}>
            <img src='./img/user.png'/>
            <div className='loginuser-dpname'>{display_name}</div>
          </div>
        </div>
      )
    }
  

   
    
  }



  export default Header