import { useEffect,useRef,useState} from "react"
import { useDispatch } from "react-redux";
import {useParams} from 'react-router-dom';
import { useHistory } from "react-router-dom";

function Detail(props) {

    let {id} = useParams();
    let width = useRef();
    const history = useHistory();
    const dispatch = useDispatch();


    return(
        <div className="detail-container">
            <div className='detail-product' ref={width}>
                <div className='detail-imgwrap'>
                    <img src={props.state[id]?.img} alt=""/>
                </div>
                <div className='detail-box'>
                    <div className="detail-text">
                        <div className="detail-name"> {props.state[id]?.name} </div>
                        <div className="detail-price">price : {props.state[id]?.price}원 </div>
                    </div>
                    <div className='detail-button'>
                        <button onClick={()=>{
                        history.push({pathname:"/cart",state: id})
                        basket_info()}}>구매하기</button>
                        <button onClick={()=>{basket_info("basket")}}>장바구니담기</button>
                    </div>
                </div>
            </div>
        </div>
    )

    function basket_info(btn) {
        dispatch({type:"basket/PLUS",
        payload:{id: id, 
                 name: props.state[id]?.name, 
                 quan:1, 
                 price: props.state[id]?.price,
                 img: props.state[id]?.img,
                 stock: props.state[id]?.stock} })
        
        if(btn === "basket") {
            if(window.confirm("상품이 장바구니에 추가되었습니다.\n장바구니로 이동하시겠습니까 ? ") === true) {
                history.push("/cart");
            }
        }

    }
   



}


export default Detail