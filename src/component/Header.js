import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";



function Header(props) {

    const history = useHistory();


    return(  
      <div>
        
          <div className='member-container'>
            <div className='mem login'>LOGIN</div>
            <div className='mem join' onClick={()=>{history.push("/join")}}>JOIN</div>
            <div className='mem cart'>CART</div>
          </div>
          <div className='logo-container' onClick={()=>{history.push("/")}}>
            <img className='logo-img' src= "/img/95logo.png" alt=""/>
            <div className='logo-title'>Boardshop</div>
          </div>
        
        <div className={props.headon === false ? "navbar" : "navbar-fixed" } >
          <div className='inner' >
            <ul className = "nav-container">
              <li className='menu' onClick={()=>{history.push("/product")}}>롱보드</li>  
              <li className='menu'>스케이드보드</li>
              <li className='menu'>의류</li>
            </ul>
          </div>
        </div>
     </div>
    )
  }



  export default Header