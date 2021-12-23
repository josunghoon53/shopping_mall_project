import { useEffect,useRef,useState} from "react"
import { useDispatch } from "react-redux";
import {useParams} from 'react-router-dom';
import { useHistory } from "react-router-dom";

function Detail(probs) {

    let {id} = useParams();
    let width = useRef();
    const history = useHistory();
    const dispatch = useDispatch();


    return(
        <div className="detail-container">
            <div className='detail-product' ref={width}>
                <div className='detail-imgwrap'>
                    <img src={probs.state[id]?.img} alt=""/>
                </div>
                <div className='detail-box'>
                    <div className="detail-text">
                        <div className="detail-name"> {probs.state[id]?.name} </div>
                        <div className="detail-price">price : {probs.state[id]?.price}원 </div>
                    </div>
                    <div className='detail-button'>
                        <button onClick={()=>{
                        history.push({pathname:"/cart",state: id})
                        dispatch({type:"basket/PLUS",
                        payload:{id: id, 
                                 name: probs.state[id]?.name, 
                                 quan:1, 
                                 price: probs.state[id]?.price,
                                 img: probs.state[id]?.img,
                                 stock: probs.state[id]?.stock} })
                       
                        }}>구매하기</button>
                        <button>장바구니담기</button>
                    </div>
                </div>
            </div>
        </div>
    )

    
   



}


export default Detail