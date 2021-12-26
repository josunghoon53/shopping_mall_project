import { useState } from "react"

function Main(props) {

    let [Move,setMove] = useState(0);
  
    function moveSlide(num) {
      // eslint-disable-next-line default-case
      switch(num){
        case 100: {
          if(Move !== 0) {
            setMove(Move+num);
          }
          break;
        }
        case -100:{
          if((props.slide.length-1)*-100 !== Move){
            setMove(Move+num)
          } 
          break;
        }
      }
    }


    return(      
      <section>
        <div className='slidemain'> 
          <div className='sl-container'>
            <div className='arrow'>
              <img className='arrowleft' onClick={()=>{moveSlide(-100)}} src ='./img/leftArrow.png' alt=""/>
              <img className='arrowright'  onClick={()=>{moveSlide(100)}} src ='./img/rightArrow.png' alt=""/>
            </div>
         
            <ul className = 'slider'  style={{transform:"translate("+Move+"vw)",
                                              width: props.slide.length*100+"vw"}}>
                {
                  props.slide.map((el,idx)=>{
                    return(
                  <li key={idx} className = 'slide'>
                    <img  className = "mainImg" 
                          src={props.slideSrc+props.slide[idx]} 
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