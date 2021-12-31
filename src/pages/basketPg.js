import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom'
import { useDispatch } from "react-redux";

function Basket(props) {

    let [itemchecked,setItemchecked] = useState([]);
    let [allchk, setAllchk] = useState(false);
    const dispatch = useDispatch();
    const [IdList, setIdList] = useState([])

    
    useEffect(() => {
        let ids = []
        props.basket && props.basket.map((item, i) => {
           ids[i] = props.basket[i].id
        })
        setIdList(ids)
     }, [])
  


    return(
    <div className="cart-container">
      <div className="cart-titlebox">
          <p>주문정보</p>
      </div>
      <ul className="cart-listbox">
        <input checked={allchk} onChange={(e)=>{
            setAllchk(e.target.checked);
            setItemchecked(allchk? [] : IdList)
        }} className='main-checkbox' type={"checkbox"}/> 
        <li>이미지</li>
        <li>상품정보</li>
        <li>판매가</li>
        <li>수량</li>
        <li>총합</li>
      </ul> 
        
        
      {props.basket.map((el,idx)=>{
        return(
        <ul key={idx} className="list-item">  
            <input onChange={(e)=>{
                const chk = e.target.checked;
                if(chk === true) {
                    setItemchecked([...itemchecked,props.basket[idx].id])               
                } else {
                    setItemchecked(itemchecked.filter((el) => el !== props.basket[idx].id));
                    setAllchk(false);
                }
            }}
                
                checked ={itemchecked.includes(props.basket[idx].id)}
                className='checkbox' 
                type={"checkbox"}/>

            <li className = "list-img"><img src={props.basket[idx].img} alt = ""/></li>
            <li>{props.basket[idx].name}</li>
            <li>{props.basket[idx].price}</li>
            <li>{props.basket[idx].quan}
                <button onClick={()=>{dispatch({type:"basket/PLUS", payload:props.basket[idx]})}}>+</button>
                <button onClick={()=>{dispatch({type:"basket/MINUS", payload:props.basket[idx]})}}>-</button>
            </li>
            <li>{props.basket[idx].price*props.basket[idx].quan}</li>
        </ul>     
        )
      })}  
     
      <div className='basket-btn'>     
        <button onClick={()=>{dispatch({type:"basket/DELETE", payload:itemchecked})}} className='delbtn'>삭제하기</button>
        <button className='paybtn'>결제하기</button>  
      </div>          
    </div>
    )


 
     
}



export default Basket