import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, firestore,getAuth } from '../firebase';
import { basket_req } from '../modules/basket';
import {useDispatch,useSelector} from 'react-redux';



function Header(props) {
  
     
    const history = useHistory();
    const dispatch = useDispatch();


   

    return(  
      <div>
        <div className='member-container'>
          {localStorage.getItem("login_name") === null
            ? <div className='mem login'onClick={()=>{props.setModal(true)}}>LOGIN</div>
            : LoggedIn()
          }
          <div className='mem join' onClick={()=>{history.push("/join")}}>JOIN</div>
          <div className='mem cart' onClick={()=>{
            history.push("/cart")
           }}>CART</div>
        </div>
        
        <div className='logo-container'>
          <div className='logo-box'onClick={()=>{history.push("/")}}>
            <img className='logo-img' src= "/img/95logo.png" alt=""/>
            <div className='logo-title'>Boardshop</div>
          </div>
        </div>
        
        <div className={props.headon === false ? "navbar" : "navbar-fixed" } >
          <div className='inner' >
            <ul className = "nav-container">
              <li className='menu' onClick={()=>{history.push("/product")}}>롱보드</li>  
              <li className='menu' onClick={()=>{
              }}>스케이드보드</li>
              <li className='menu'>의류</li>
            </ul>
          </div>
        </div>
     </div>
    )


    function LoggedIn() {
      

      //로그인하면 db에서 회원별장바구니 목록을 가져와서 로컬스토리지에 넣어준다.
      useEffect(()=>{
        dispatch(basket_req())
      },[])
  
    
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