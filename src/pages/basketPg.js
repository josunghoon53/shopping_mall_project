import { useState } from 'react';
import {useLocation} from 'react-router-dom'

function Basket(probs) {


    const location = useLocation();
    let id = location.state;
    let [num,setNum] = useState(1);
    let[allcheck,setAllcheck] = useState("");
    let [checked,setChecked] = useState("");
    let price = probs.state&&probs.state[id].price


    if(probs.state !== null)
    return(
    <div className="cart-container">
      <div className="cart-titlebox">
          <p>주문정보</p>
      </div>
      <ul className="cart-listbox">
        <input checked ={allcheck} onClick={check}  className='main-checkbox' type={"checkbox"}/> 
        <li>이미지</li>
        <li>상품정보</li>
        <li>판매가</li>
        <li>수량</li>
        <li>총합</li>
      </ul> 
       
      <ul className="list-item">
        <input onClick={()=>{setChecked(!checked)}} checked={checked} className='checkbox' type={"checkbox"}/>
        <li className = "list-img"><img src={probs.state&&probs.state[id].img} alt=""/></li>
        <li>{probs.state&&probs.state[id].name}</li>
        <li>{price}</li>
        <li>{num}
            <button onClick={plus}>+</button>
            <button onClick={minus}>-</button>    
        </li>
        <li>{(price*num).toLocaleString()}</li>
      </ul>     
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

    function plus() {
        if(num <= (probs.state && probs.state[id].stock)){
            setNum(++num);
        }
        else {
            alert("더 이상 재고가 없습니다")
        }
    }

    function minus() {
        if(num > 1){
            setNum(--num);
        }
    }


 





}



export default Basket