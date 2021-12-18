import {Link} from 'react-router-dom';

function Header(probs) {
    return(  
      <div>
        <Link to = "/" style={{all:"unset"}}> 
          <div className='logo-container'>
            <img className='logo-img' src= "/img/95logo.png" alt=""/>
            <div className='logo-title'>Boardshop</div>
          </div>
        </Link>    
        <div className={probs.headon === false ? "navbar" : "navbar-fixed" } >
          <div className='inner' >
            <ul className = "nav-container">
              <Link to = "/product" style={{all:"unset"}}><li className='menu'>롱보드</li></Link>     
              <li className='menu'>스케이드보드</li>
              <li className='menu'>의류</li>
            </ul>
          </div>
        </div>
     </div>
    )
  }



  export default Header