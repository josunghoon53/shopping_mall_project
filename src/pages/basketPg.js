import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom'
import { useDispatch } from "react-redux";

function Basket(probs) {


    let[allcheck,setAllcheck] = useState("");
    let [checked,setChecked] = useState();
   
    const dispatch = useDispatch();


    return(
    <div className="cart-container">
      <div className="cart-titlebox">
          <p>주문정보</p>
      </div>
      <ul className="cart-listbox">
        <input checked ={allcheck} onChange={check}  className='main-checkbox' type={"checkbox"}/> 
        <li>이미지</li>
        <li>상품정보</li>
        <li>판매가</li>
        <li>수량</li>
        <li>총합</li>

      </ul> 
        
        
      {probs.basket.map((el,idx)=>{
        return(
        <ul key={idx} className="list-item">  
            <input onChange={()=>{setChecked(!checked)}} 
                   checked={checked} 
                   className='checkbox' 
                   type={"checkbox"}/>
            <li className = "list-img"><img src={probs.basket[idx].img} alt = ""/></li>
            <li>{probs.basket[idx].name}</li>
            <li>{probs.basket[idx].price}</li>
            <li>{probs.basket[idx].quan}
                <button onClick={()=>{dispatch({type:"basket/PLUS", payload:probs.basket[idx]})}}>+</button>
                <button onClick={()=>{dispatch({type:"basket/MINUS", payload:probs.basket[idx]})}}>-</button>
            </li>
            <li>{probs.basket[idx].price*probs.basket[idx].quan}</li>
        </ul>     
        )
      })}  
     
      <div className='basket-btn'>     
        <button className='delbtn'>삭제하기</button>
        <button className='paybtn'>결제하기</button>  
      </div>          
    </div>
    )


    function check() {
        if(allcheck === checked){
            setAllcheck(!allcheck);
            setChecked(!checked)
        } else {
            setAllcheck(!allcheck)
        }
    }





}



export default Basket