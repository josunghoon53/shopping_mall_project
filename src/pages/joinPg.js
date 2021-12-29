import { useState } from "react"
import {tou} from '../tou'


function Join () {

    const nocheck = './img/nocheck.png'
    const check = './img/checked.png'
    let [allchecked,setallChecked] = useState(false);
    let [img,setImg] =useState([nocheck,nocheck,nocheck,nocheck,nocheck]);

    function checkConfirm(e,idx) {
      let copy = [...img];
      if(e.target.checked === true){
        copy[idx] = check;
        setImg(copy);
      } else {
        copy[idx] = nocheck;
        setImg(copy);
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
                    <select  name="phone-id">
                      <option selected>010</option>
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
                    <input onChange={(e)=>{setallChecked(e.target.checked)}} type="checkbox"/>
                    <img src={allchecked === true ? "./img/checked.png" :"./img/nocheck.png" } alt=""/>
                  </label>
                  <p>이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두 동의합니다.</p>
                </div>

                {tou.map((el,idx)=>{
                  return(
                    <div className="tou">
                    <p>{tou[idx].name}</p> 
                    <div className="toutext-box">
                      
                      <embed className="toutext" src={tou[idx].embed}/>
                    </div>
                    <div className="touitem">
                      <p>{tou[idx].text}</p>
                      <label className="check-custom">
                        <input onChange={(e)=>{checkConfirm(e,idx)}} type="checkbox"/>
                        <img src={img[idx]} alt=""/>
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