import { useEffect, useState,useRef} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';

function ProductPg(probs) {

    let ulWidth  = useRef();
    let [liwidth ,setWidth] = useState();
    const dispatch = useDispatch();  

    useEffect(() => {

        setWidth((ulWidth.current.clientWidth-30)/4)
        const resizeFuc = () =>{
          setWidth((ulWidth.current.clientWidth-30)/4)
        }
        window.addEventListener("resize", resizeFuc);
        return () => {
          window.removeEventListener("resize", resizeFuc);
        };
    },);
    
    
    return (
        <div className="inner">
            <div className="product-container">
                <div className="product-title">
                    롱보드
                </div>
                <div className="sort-box">
                    <div onClick={()=>{dispatch({type:'product/SORT_DESC'})}}>높은 가격순</div>
                    <div onClick={()=>{dispatch({type:'product/SORT_ASC'})}}>낮은 가격순</div>
                    <div>인기 상품순</div>
                </div>    
                <div className="product-box">
                    <ul className="ulProduct" ref={ulWidth}>
                        {probs.state && probs.state.map((el,idx)=>{
                            return(
                          <Link style={{all:'unset'}} to = {`/detail/${idx}`}>
                            <li key={idx} className="liProduct">
                                    <div className="liproduct-imgwrap" style={{width:liwidth+'px', height:liwidth*1.25+'px'}} >
                                        <img src={probs.state[idx].img} alt=""/>
                                    </div>
                                    <div className="liproduct-text">
                                        <p>{probs.state[idx].name}</p>
                                        <p>{(probs.state[idx].price).toLocaleString()}</p>
                                        <p>테스트확인용 [ {probs.state[idx].stock} ]</p>
                                    </div>
                            </li>
                           </Link>
                            )
                        })}
                    </ul>
                </div>
            </div>

        </div>

    )

}


export default ProductPg