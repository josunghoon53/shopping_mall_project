import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { authService, firestore, getAuth } from '../firebase';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Basket(props) {

    let [itemchecked,setItemchecked] = useState([]);
    let [allchk, setAllchk] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const [IdList, setIdList] = useState([])
    const [total,setTotal] = useState(0);
    const [alltotal,setAlltotal] = useState(0)
    const [width,setwidth] = useState(800)
    //가상 배송비 (제품한개당 2500원)
    const [deliver,setDeliver] = useState(0);    


    useEffect(() => {
        let ids = []
        props.basket && props.basket.map((item, i) => {
           ids[i] = props.basket[i].id
        })
        setIdList(ids)
        setItemchecked(ids)
        setAllchk(true)
     }, [])
  


    useEffect(()=>{
        setTotal(0)
        setDeliver(0)
        setAlltotal(0)
        itemchecked.map((el,idx)=>{
            if(props.basket[idx]!==undefined){
            setTotal(total => total + props.basket[idx].price*props.basket[idx].quan)
            setDeliver(deliver=>deliver+2500)
            setAlltotal(total + deliver)}
            else{setDeliver(0)}
        })

    })

   useEffect(() => {

    const resizeFuc = () =>{
        if(window.innerWidth <= 870){
        setwidth(window.innerWidth-70)
        }else {
            setwidth(800)
        }
    }

    window.addEventListener("resize", resizeFuc);
    return () => {
      window.removeEventListener("resize", resizeFuc);
    };
    },);

    return(
    <div className="cart-container" style={{width:`${width}px`}}>
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
        <button onClick={()=>{
            dispatch({type:"basket/DELETE", payload:itemchecked})}} className='delbtn'>삭제하기</button>
      </div>    
     
      <div style={{width:`${width}px`}} className='finalbasket'>
        <div className='line-top'/> 
        <div className='finaltitle'>최종 결제 금액</div>
        <table style={{width:`${width}px`}} className='table'>
            <thead>   
                <tr>    
                  <td >총 상품금액</td>
                  <td rowSpan={2}>+</td>
                  <td>배송비</td>
                  <td rowSpan={2}>-</td>                
                  <td style={{color:'#b80000'}}>할인예상금액</td>
                </tr>      
                <tr>    
                  <td>{total}원</td>
                  <td>{deliver}원</td>               
                  <td style={{color:'#b80000'}}>0원</td>
                </tr>   
            </thead>
            <tbody className='tbody'>
              <tr>      
                <td style={{paddingTop:"15px"}}>총 주문금액</td>
                <td style={{paddingTop:"15px"}} colSpan={4}>{alltotal}원</td>
              </tr> 
            </tbody>
        </table>
        <div className='basketbtnBox'>
            <button className='paybtn' onClick={()=>{history.push('./product')}}>쇼핑계속하기</button>
            <button className='paybtn'>결제하기</button>
        </div>
      </div>

    </div>
    )


 
     
}



export default Basket