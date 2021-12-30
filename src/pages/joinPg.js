import axios from "axios";
import { useEffect, useState } from "react"


function Join () {

    const nocheck = './img/nocheck.png'
    const check = './img/checked.png'

    let [allchecked,setallChecked] = useState(nocheck);
    let [itemcheck,setItemcheck] =useState([nocheck,nocheck,nocheck,nocheck,nocheck]);
    
    let [toutext,setToutext] = useState([]);



    useEffect(()=>{

      const data = async ()=> { 
        const dt = await axios.get('tou.json');
        return (dt.data)
      }

      data().then((result)=>{
        setToutext(result)       
      });

    },[])

    function touallcheck() {
      let copy = [...itemcheck]
      if(allchecked === nocheck) {
        setallChecked(check);
        itemcheck.map((el,idx)=>{
          copy[idx] = check
          setItemcheck(copy,copy[idx])
        })

      } else {
        setallChecked(nocheck)
        itemcheck.map((el,idx)=>{
          copy[idx] = nocheck
          setItemcheck(copy,copy[idx])
        })
      }
    }
    
    function toucheck(idx) {
      let copy = [...itemcheck]
      if(copy[idx] === nocheck) {
        copy[idx] = check
        setItemcheck(copy,copy[idx])
      } else {
        copy[idx] = nocheck
        setItemcheck(copy,copy[idx])
        setallChecked(nocheck)
      }
    }
    
     
      
    

    return (
        <div className="inner">   
          <div className="join-container">
            <div className="userInfo-container">
              <h1 className="userInfo-title">회원가입</h1>
              <p className="userInfo-sub">기본정보</p>
              <ul className="userInfo-box">
                <li className="info id">
                  <div className="infoname">아이디</div>
                  <input className="input-info"></input>

                </li>
                <li className="info pw">
                  <div className="infoname">비밀번호</div>
                  <input className="input-info"></input>
        
                </li>  
                <li className="info pw-confirm">
                  <div className="infoname">비밀번호 확인</div>
                  <input className="input-info"></input>
          
                </li>  
                <li className="info name">
                  <div className="infoname">이름</div>
                  <input className="input-info"></input>

                </li>  
                <li className="info email">
                  <div className="infoname">이메일</div>
                  <input className="input-info"></input>

                </li>  
                <li className="info phone">
                  <div className="infoname">휴대전화</div>
                  <div className="phone-box" style={{paddingLeft:"0", marginLeft:"26px"}}>
                    <select defaultValue="def"  name="phone-id">
                      <option value="def">010</option>
                      <option>011</option>
                      <option>016</option>
                      <option>017</option>
                      <option>018</option>
                    </select>
                    <span style={{margin:"0 5px"}}>-</span>
                    <input className="phoneNum"></input>
                    <span style={{margin:"0 5px"}}>-</span>
                    <input className="phoneNum"></input>
                  </div>
                </li>    
              </ul>    
            </div>

            <div className="tou-container">
              <p className="tou-title">전체동의</p>
              <div className="tou-box">
                <div className="all-check">
                  <label className="check-custom">
                    <input type="checkbox" onChange={()=>{touallcheck()}}/>
                    <img src={allchecked} alt=""/>
                  </label>
                  <p>이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두 동의합니다.</p>
                </div>

                {toutext.map((el,idx)=>{             
                  return(
                    <div key={idx} className="tou">
                    <p>{toutext[idx].name}</p> 
                    <div className="toutext-box">  
                     <embed className="toutext" src={toutext[idx].embed}/>
                    </div>
                    <div className="touitem">
                      <p>{toutext[idx].text}</p>
                      <label className="check-custom">
                        <input type="checkbox" onChange={()=>{toucheck(idx)}}/>
                        <img src={itemcheck[idx]} alt=""/>
                      </label>
                    </div>
                  </div>
                  )
                })}

              </div>
            </div>
          </div>
        </div>
    )
}

export default Join