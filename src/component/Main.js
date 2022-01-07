import { useEffect, useRef, useState } from "react"

function Main(props) {

    let [Move,setMove] = useState(0);
    const timeoutRef = useRef(null);

  
  
    function moveSlide(num) {
      // eslint-disable-next-line default-case
      switch(num){
        case 100: {
          if(Move ===0) {
            setMove(-500);
          } else{
          setMove(Move+num)
          }
          break;
        }
        case -100:{
          if(Move ===-800) {
            setMove(-300);
          } else{
          setMove(Move+num)
          }
          break;
        }
      }
    }

    useEffect(()=>{
      const makeclone = () =>{
        let copy = [...props.slide];
        copy.push(...props.slide);
        copy.unshift(...props.slide);
        props.setSlide(copy);
      };
      setMove(-300);
      makeclone();
    
      return () => {clearTimeout(makeclone)}
      
    },[])



    //setinterval 사용시 문제 발생으로 인해 커스텀 훅 사용 
    //https://overreacted.io/making-setinterval-declarative-with-react-hooks/
    //위 링크 참조해서 setinterval과 useinterval 의 차이 공부하기
    
    useInterval(()=>{
      moveSlide(-100);
    },2500)

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
                    <li key={idx}  className="slide">                    
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