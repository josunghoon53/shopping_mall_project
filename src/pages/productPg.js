import { useEffect, useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';

function ProductPg(props) {

    let ulWidth  = useRef();
    let [liwidth ,setWidth] = useState();
    const [sorton,setsorton] = useState([true,false,false]);
    const [sortitem,setsortitem] = useState([{name:'인기상품순' ,type:'product/SORT_POPU'}
                                            ,{name:'높은가격순' ,type:'product/SORT_DESC'}
                                            ,{name:'낮은가격순' ,type:'product/SORT_ASC'}])
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
    
   
    function sort_item (idx) {
        let copy = [false,false,false];
        copy[idx] = true
        setsorton(copy)
    }
    
    return (
        <div className='productpage'>
            <div className="product-container">
                <div className="product-title">
                    롱보드
                </div>
                <div className="sort-box">
                   {sortitem.map((el,idx)=>{
                      return(
                        <div className={sorton[idx] ? 'sort-item-bold' : 'sort-item-normal'} 
                        key={idx} onClick={()=>{
                            sort_item(idx)
                            dispatch({type:sortitem[idx].type, payload : props.state})}}>{sortitem[idx].name}</div>
                      )
                    })}
                </div>    
                <div className="product-box">
                    <ul className="ulProduct" ref={ulWidth}>
                        {props.state.map((el,idx)=>{
                            return(
                          <Link key={idx} style={{all:'unset'}} to = {`/detail/${idx}`}>   
                            <li key={idx} className="liProduct">
                                <div className="liproduct-imgwrap" style={{width:liwidth+'px', height:liwidth*1.25+'px'}} >
                                    <img src={props.state[idx].img} alt=""/>
                                </div>
                                <div className="liproduct-text">
                                    <p className='liproduct-name'>{props.state[idx].name}</p>
                                    <p className='liproduct-price'>{(parseInt(props.state[idx].price)).toLocaleString()}<span>원</span></p>
                                   
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