import { useRef, useState } from 'react';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { authService, firestore,getAuth } from '../firebase';
import Login from "./Login";


function Header(props) {
  
    
    const history = useHistory();
 



    

   
    return(  
      <div>
       
        <div className='member-container'>
          {
            props.setu.islogin
            ?<div>조성훈</div>
            :<div className='mem login'onClick={()=>{props.setModal(true)}}>LOGIN</div>
          }
          <div className='mem join' onClick={()=>{history.push("/join")}}>JOIN</div>
          <div className='mem cart'onClick={()=>{
            console.log(getAuth.currentUser.email)
          
          }}>CART</div>
        </div>
        
        <div className='logo-container' onClick={()=>{history.push("/")}}>
          <div className='logo-box'>
            <img className='logo-img' src= "/img/95logo.png" alt=""/>
            <div className='logo-title'>Boardshop</div>
          </div>
          <button onClick={()=>{authService.signOut().then(()=>{    
          }) }}/>

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


    function LoggedIn(name) {

 
      return (
        <div className='loginuser-container'>
          <img src='./img/user.png'/>
          <div></div>
         
        </div>

      )
    }
  

    
  }



  export default Header