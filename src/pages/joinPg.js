import axios from "axios";
import { useEffect, useState } from "react"
import Signup  from "../component/Signup";

function Join (props) {

    const nocheck = './img/nocheck.png'
    const check = './img/checked.png'


    let [allchecked,setallChecked] = useState(nocheck);
    let [itemcheck,setItemcheck] =useState([nocheck,nocheck,nocheck,nocheck,nocheck]);
    let [toutext,setToutext] = useState([]);

    let [register,setRigster] = useState([false,false,false,false,false])
    let[idchk,setIdchk] = useState('');
    let[dbchk,setDbchk] = useState(false);
    let[pwchk,setPwchk] = useState('');
    let[pwconfirm,setPwconfirm] = useState('');
    let[email,setEmail] = useState('');
    let [phoneid,setPhoneid] = useState(['010','011','016','017','018'])
    let [phone,setPhone]= useState(['010','',''])


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
                <input type="text" className="input-info" onChange={(e)=>{
                  setIdchk(e.target.value)
                  setDbchk(false);
                  let copy = [...register];
                  copy[0] = dbchk;
                  setRigster(copy);
                }}/>
                <button className="doublechk-btn" onClick={()=>{
                  let copy = [...register];
                Signup("ID",props.join,idchk) === "사용가능한 아이디입니다."
                ? copy[0] = true : copy[0] = false
                alert(Signup("ID",props.join,idchk))
                }}>중복확인</button>
              </li>

              <li className="info pw">
                <div className="infoname">비밀번호</div>
                <input onChange={(e)=>{
                  setPwchk(e.target.value)}} type="password" maxLength="16" 
                  className="input-info"/>
                <p className="warning">{Signup("PW",props.join,pwchk)}</p>
                <p className="pw-condition">(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)</p>
              </li>  
              
              <li className="info pw-confirm">
                <div className="infoname">비밀번호 확인</div>
                <input type="password" maxLength="16" className="input-info"
                       onChange={(e)=>{setPwconfirm(e.target.value)}}/>
                <p className="warning">{
                  pwconfirm !== ""
                  ? pwconfirm === pwchk ? ""  : "일치하지않습니다"
                  :""
                }</p>
              </li>  

              <li className="info name">
                <div className="infoname">이름</div>
                <input className="input-info"></input>
              </li>  

              <li className="info email">
                <div className="infoname">이메일</div>
                <input type="email" className="input-info"  onChange={(e)=>{
                  setEmail(e.target.value);
                }}/>
                 <p className="warning">{
                  email !== "" 
                  ? Signup("EMAIL",props.join,email)
                  : ""}</p>
              </li>  

              <li className="info phone">
                <div className="infoname">휴대전화</div>
                <div className="phone-box" style={{paddingLeft:"0", marginLeft:"26px"}} >
                  <select defaultValue={phoneid[0]}  name="phone-id" onChange={(e)=>{
                     let copy = [...phone];
                     copy[0] = e.target.value;
                     setPhone(copy);
                  }}>
                    {phoneid.map((el,idx)=>{
                      return(
                        <option value={el} key={idx}>{el}</option>
                      )
                    })}
                  </select>
                  <span style={{margin:"0 5px"}}>-</span>
                  <input maxLength="4" className="phoneNum" onChange={(e)=>{
                    let copy = [...phone];
                    copy[1] = e.target.value;
                    setPhone(copy);
                  }}/>
                  <span style={{margin:"0 5px"}}>-</span>
                  <input maxLength="4" className="phoneNum" onChange ={(e)=>{
                     let copy = [...phone];
                     copy[2] = e.target.value;
                     setPhone(copy);
                  }}/>
                </div>
              </li>    
            </ul>    
          </div>
          <button onClick={()=>{console.log(register)}}/>

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

          <div className="joinbtn-box">
            <button className="joinbtn">회원가입</button>
          </div>
        </div>
      </div>
    )
}

export default Join