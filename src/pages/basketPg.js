import { useState } from 'react';
import {useLocation} from 'react-router-dom'

function Basket(probs) {


    const location = useLocation();
    let id = location.state;
    let [num,setNum] = useState(1);
    let price = probs.state&&probs.state[id].price

    if(probs.state !== null)
    return(
    <div className="cart-container">
      <div className="cart-titlebox">
          <p>주문정보</p>
      </div>
      <ul className="cart-listbox">
        <li>이미지</li>
        <li>상품정보</li>
        <li>판매가</li>
        <li>수량</li>
        <li>총합</li>
      </ul> 
       
      <ul className="list-item">
        <li className = "list-img"><img src={probs.state&&probs.state[id].img} alt=""/></li>
        <li>{probs.state&&probs.state[id].name}</li>
        <li>{price}</li>
        <li>{num}
            <button onClick={plus}>+</button>
            <button onClick={minus}>-</button>    
        </li>
        <li>{(price*num).toLocaleString()}</li>
      </ul>         
      <button className='paybtn'>결제하기</button>        
    </div>
    )


    function plus() {
        if(num <= (probs.state && probs.state[id].stock)){
            setNum(++num);
        }
        else {
            alert("더 이상 재고가 없습니다")
        }
    }

    function minus() {
        if(num > 0){
            setNum(--num);
        }
    }


 





}



export default Basket