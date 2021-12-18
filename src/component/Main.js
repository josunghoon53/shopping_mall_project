
function Main(probs) {
    return(
      <section>
        <div className='slidemain'> 
          <div className='sl-container'>
            <div className='arrow'>
              <img className='arrowleft' onClick={()=>{}} src ='./img/leftArrow.png' alt=""/>
              <img className='arrowright' src ='./img/rightArrow.png' alt=""/>
            </div>
            <ul className = 'slider'>
                {
                  probs.slide.map((el,idx)=>{
                    return(
                  <li key={idx} className = 'slide'>
                    <img  className = "mainImg" 
                          src={probs.slideSrc+probs.slide[idx]} 
                          alt =""/>
                  </li>
                  )})
                }       
            </ul>
          </div>
        </div> 
    </section>
    )
  }

  export default Main