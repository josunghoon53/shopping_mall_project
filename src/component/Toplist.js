import { useEffect,useState,useRef} from 'react';
import {Link} from 'react-router-dom';


function Toplist(probs) {
    let ulWidth  = useRef();
    let [liwidth ,setWidth] = useState();


    /*리사이즈이벤트*/
    useEffect(() => {
        const resizeFuc = () =>{
          setWidth((ulWidth.current.clientWidth-60)/3)
        }
        window.addEventListener("resize", resizeFuc);
        return () => {
          window.removeEventListener("resize", resizeFuc);
        };
      },);
    
       
    return(
      <div className='inner'>
        <div className='container'>
          <div className='title-container'>
            <div>TOP ITEM</div>
          </div>
          <div className='list-container' >
            <ul className ='listbox'  ref={ulWidth}>
              {probs.state && probs.state.map((el,idx) => {
                let id = idx+1
                let img_src = './img/BEST'+id+'.png'             
                if(idx < 3) 
                return(
                <li key={idx} className='list'>
                  <Link to = {`/detail/${idx}`}>                  
                    <div className='img-wrapper' style={{width:liwidth+'px', height:liwidth*1.3+'px'}} >
                      <span className='box'>
                        <img src= {img_src} alt=''/>
                      </span>
                      <img src = {probs.state[idx].img} alt = ""/>
                    </div>
                    <div className='img-text'></div>
                  </Link>
                </li>)
              })}          
            </ul>
          </div>
        </div>    
      </div>  
    )
}

export default Toplist