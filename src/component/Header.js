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

    

      //React has detected a change in the order of Hooks called by Header
      //최상위(at the Top Level)에서만 Hook을 호출해야 합니다
      //warning _ 버그로 이어질 가능성있음_수정요망
      useEffect(()=>{
        dispatch(basket_req())
      },[])
  
      
      let display_name = localStorage.getItem("login_name")

      return (
        <div className='loginuser-container'>
          <div className='loginuser-box'onClick={()=>{
            props.setProfil(true)
          }}>
            <img  src={process.env.PUBLIC_URL + '/img/user.png'}/>
            <div className='loginuser-dpname'>{display_name}</div>
          </div>
        </div>
      )
    }
  

   
    
  }



  export default Header