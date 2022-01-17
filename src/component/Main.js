import { useEffect, useRef, useState } from "react"

function Main(props) {

    let [Move,setMove] = useState(0);
    let[dot,setdot] = useState(['','',''])
    let[mouseover,setmouseover] = useState(false)
  
    function moveSlide(num) {
      // eslint-disable-next-line default-case
      setMove(Move+num)
    
      if(Move === -200) {
        setMove(0)
      }
    }



    //setinterval 사용시 문제 발생으로 인해 커스텀 훅 사용 
    //https://overreacted.io/making-setinterval-declarative-with-react-hooks/
    //위 링크 참조해서 setinterval과 useinterval 의 차이 공부하기
    
    useInterval(()=>{
      if(mouseover!==true){
      moveSlide(-100);
      }
    },4000)

    function useInterval(callback, delay) {
      const savedCallback = useRef(); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.
    
      useEffect(() => {
        savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
      }, [callback]);
    
      useEffect(() => {
        function tick() {
          savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
        }
        if (delay !== null) { // 만약 delay가 null이 아니라면 
          let id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
          return () => clearInterval(id); // unmount될 때 clearInterval을 해준다.
        }
      }, [delay]); // delay가 바뀔 때마다 새로 실행된다.
    }


    return(      
      <section>
        <div className='slidemain'> 
          <div onMouseOver={()=>{setmouseover(true)}} onMouseOut={()=>{setmouseover(false)}} className='sl-container'>
            <ul className = 'slider'  style={{transform:"translate("+Move+"vw)",
                                              width: props.slide.length*100+"vw"}}>
                {   
                  props.slide.map((el,idx)=>{ 
                  return(  
                    <li key={idx}  className="slide">     
                      <img  className = "mainImg" 
                            src={props.slideSrc+props.slide[idx]} 
                            alt =""/>
                     
                    </li>
                  )})
                }
            </ul>
            <div className="dot-box">
            {dot.map((el,idx)=>{
              return(
                <img onClick={()=>{
                  setMove(idx*-100)
                }} className="maindot" src= {Move/-100 === idx 
                  ? './img/black_record.png' : './img/record.png'}/>

              )
            })}
          </div>
          </div>
        </div> 
    </section>
    )
  }

  export default Main