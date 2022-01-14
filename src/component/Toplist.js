import React, { useEffect,useState,useRef} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';

function Toplist(props) {


  const top = useRef();
  const ul = useRef();

  const [boxwidth,setBoxwidth] = useState();
  const [liwidth,setliwidth] = useState(294)
  const [ulwidth,setUlwidth] = useState(0)
  const [testnum,setTestnum] = useState([1,2,3,4])
  const [ulmove,setUlmove] = useState(testnum.length*-liwidth);


  const [touchStartClientX, setTouchStartClientX] = useState(0);
  const [touchEndClientX, setTouchEndClientX] = useState(0);
  const [cursorOn, setCursorOn] = useState(false);

  //현재 슬라이드 위치
  const [slideIdx,setSlideidx] = useState(0);

  let [change_chk,setChangechk] = useState(0)

  /*
    양쪽이 일정하게 화면밖으로 나가도록 반응형 구현
    데탑부터 모바일까지의 반응형_고려
    yes24페이지 참고
  */
  useEffect(() => {
    setBoxwidth(window.innerWidth-17-top.current.clientWidth)
    const resizeFuc = () =>{
      setBoxwidth(window.innerWidth-17-top.current.clientWidth)
    }
    window.addEventListener("resize", resizeFuc);
    return () => {
      window.removeEventListener("resize", resizeFuc);
    };
  },[]);


  //슬라이드복제 -- 무한슬라이드
  useEffect(()=>{
    const makeclone = ()=>{
      let clone = [...testnum,...testnum,...testnum];
      setTestnum(clone)
      setUlwidth(clone.length*liwidth)
    }
    makeclone();
    return ()=>clearTimeout(makeclone)
  },[])


  function change(){
    setChangechk(prev =>prev-1)
  }

  function moveslide(num){
    if(change_chk == 0){
      setSlideidx(num)
      setChangechk(prev => prev+1)
      setUlmove(-(num+4)*liwidth)  
      ul.current.style.transition =  '0.4s ease'
      if(num === -4 || num === 4) {
        setTimeout(() => {
          ul.current.style.transition = 'none'
          setUlmove(-liwidth*4)
          setSlideidx(0)
        }, 400);
      }
      setTimeout(change,440);
    } 
  } 
  
  

  //모바일 드래그 슬라이드 구현

  const ontouchstart = (e) =>{
    setTouchStartClientX(e.touches[0].clientX)
    setCursorOn(true)
  }

  const ontouchend = (e) =>{
    setTouchEndClientX(e.changedTouches[0].clientX)
    setCursorOn(false)
  }

  useEffect(() => {
    const dragSpace = Math.abs(touchStartClientX - touchEndClientX);
    if (touchStartClientX !== 0) {
      if (touchEndClientX < touchStartClientX && dragSpace > 100) {
        moveslide(slideIdx+1);
      } else if (touchEndClientX > touchStartClientX && dragSpace > 100) {
        moveslide(slideIdx-1);
      }
    }
  }, [touchEndClientX]);
  

  
  return(
    <div>
      <button onClick={()=>{moveslide(slideIdx-1)}} style={{width:"50px", height :"50px"}}>prev</button>
      <button onClick={()=>{moveslide(slideIdx+1)}} style={{width:"50px", height :"50px"}}>next</button>
      <div className='top-container'>
        <div style={{transform:`translateX(${boxwidth/2}px)`}} ref={top} className='top-box'>
          <ul onTouchStart={ontouchstart}  
              onTouchEnd={ontouchend}
          style={{transform:`translateX(${ulmove}px)`,width:`${ulwidth}px`}} 
          ref={ul} className='top-ul'>
            {testnum.map((el,idx)=>{
              return(
                <li key={idx} className='top-li'>{testnum[idx]}</li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>  
  )
}

export default Toplist