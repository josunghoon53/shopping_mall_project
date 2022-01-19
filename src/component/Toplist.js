import React, { useEffect,useState,useRef, useLayoutEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { findDOMNode } from 'react-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function Toplist(props) {

  const top = useRef();
  const ul = useRef();
  const li = useRef();
  const history = useHistory();

  const [boxwidth,setBoxwidth] = useState();


  const [liwidth,setliwidth] = useState(289)
  const [ulwidth,setUlwidth] = useState(0)
  const [testnum,setTestnum] = useState([])
  const [ulmove,setUlmove] = useState(4*-liwidth);

  const [touchStartClientX, setTouchStartClientX] = useState(0);
  const [touchEndClientX, setTouchEndClientX] = useState(0);
  const [cursorOn, setCursorOn] = useState(false);


  //현재 슬라이드 위치
  const [slideIdx,setSlideidx] = useState(0);
  let [change_chk,setChangechk] = useState(0)
  const dispatch = useDispatch();


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


  useEffect(()=>{
    props.state.map((el,idx)=>{
      if(idx < 4)
      setTestnum(testnum=> [...testnum,el])
      if(idx === 3){
        setTestnum(testnum=> [...testnum,...testnum,...testnum])
      }  
    })
  },[props.state])

  //슬라이드복제 -- 무한슬라이드
  useEffect(()=>{
    if(testnum.length!==0)
    setUlwidth(testnum.length*liwidth)
  },[testnum.length])

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
  


  //데탑 드래그 슬라이드 구현

  const onmousedown = (e) =>{
    setTouchStartClientX(e.clientX)
    setCursorOn(true)
  }

  const onmouseup = (e) =>{
    setTouchEndClientX(e.clientX)
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
      <div className='top-container'>
        <div className='top-title'>BEST</div>
        <div style={{transform:`translateX(${boxwidth/2}px)`}} ref={top} className='top-box'>
          <ul onMouseDown={onmousedown}
              onMouseUp={onmouseup}
              onTouchStart={ontouchstart}  
              onTouchEnd={ontouchend}
          style={{transform:`translateX(${ulmove}px)`,width:`${ulwidth}px`}} 
          ref={ul} className='top-ul'>
          {testnum.map((el,idx)=>{
            return(
              <li ref={li} key={idx} className='top-li'>
                <img src={testnum[idx].img} onClick={()=>{history.push(`/detail/${props.state.indexOf(el)}`)}}/>
                <div className='top-imginfo'>
                  <p className='top-imgname'>{testnum[idx].name}</p>
                  <p className='top-imgprice'>{testnum[idx].price.toLocaleString()}<span className='topunit'>원</span></p>
                </div>
              </li>
            )
          })}
          </ul>
        </div>
        <div className='banner'>
          <a href='https://cafe.naver.com/longboardkorea' target='_blank'>
            <img src='./img/longkor_cafe_banner.jpg'/>
          </a>
        </div>
      
      </div>
    </div>  
  )
}

export default Toplist