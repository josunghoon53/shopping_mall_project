import axios from "axios";
import { useEffect, useState } from "react"
import Signup  from "../component/Signup";
import {useDispatch} from 'react-redux';

import {authService, firestore } from "../firebase";
import {user_req} from "../modules/join";



function Join (props) {

    const nocheck = './img/nocheck.png'
    const check = './img/checked.png'
    const dispatch = useDispatch();

    let [allchecked,setallChecked] = useState(nocheck);
    let [itemcheck,setItemcheck] =useState([nocheck,nocheck,nocheck,nocheck,nocheck]);
    let [toutext,setToutext] = useState([]);

    let [register,setRegister] = useState([false,false,false,false,false,false,false])
    let[idchk,setIdchk] = useState('');
    let[idbool,setIdbool] = useState(true);

    let[dbchk,setDbchk] = useState(false);
    let[pwchk,setPwchk] = useState('');
    let[pwconfirm,setPwconfirm] = useState('');
    let[name,setName] = useState('');
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

    useEffect(()=>{
      dispatch(user_req()) 
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



    
    function memberInfo_push() {

      authService.createUserWithEmailAndPassword(email,pwchk).then((result)=>{
        firestore.collection("users").doc(result.user.uid).set({user_id:idchk,
          name:name,email:email,phone:phone})
      })
     
      alert("??????????????? ??????????????????.")
    }


   

    return (
      <div className="inner">   
        <div className="join-container">

          <div className="userInfo-container">
            <h1 className="userInfo-title">????????????</h1>
            <p className="userInfo-sub">????????????</p>
            <ul className="userInfo-box">
                
              <li className="info id">
                <div className="infoname">?????????</div>
                <input type="text" className="input-info" onChange={(e)=>{
                  setIdchk(e.target.value)
                  setDbchk(false);
                  let copy = [...register];
                  copy[0] = dbchk;
                  setRegister(copy);
                }}/>
                <button className="doublechk-btn" onClick={()=>{
                  let copy = [...register];
                  alert(Signup("ID",props.join,idchk))
                  Signup("ID",props.join,idchk) === "?????? ????????? ??????????????????."
                  ? copy[0] = true : copy[0] = false 
                  setRegister(copy);  
                }}>????????????</button>
              </li>

              <li className="info pw">
                <div className="infoname">????????????</div>
                <input onChange={(e)=>{
                  setPwchk(e.target.value)
                  Signup("PW",props.join,e.target.value) === "?????? ????????? ?????????????????????." 
                  ? register[1] =true : register[1] = false
                  setRegister(register)
                  }} type="password" maxLength="16" 
                  className="input-info"/>
                <p className="warning">{Signup("PW",props.join,pwchk)}</p>
                <p className="pw-condition">(?????? ????????????/??????/???????????? ??? 2?????? ?????? ??????, 10???~16???)</p>
              </li>  
              
              <li className="info pw-confirm">
                <div className="infoname">???????????? ??????</div>
                <input type="password" maxLength="16" className="input-info"
                      onChange={(e)=>{
                    
                      pwchk === e.target.value ? register[2] = true : register[2] = false
                      setPwconfirm(e.target.value)
                      setRegister(register)}}
                      />
                <p className="warning">{
                  pwconfirm !== ""
                  ? pwconfirm === pwchk ?  "???????????????"  : "????????????????????????"
                  :""
                }</p>
              </li>  

              <li className="info name">
                <div className="infoname">??????</div>
                <input className="input-info" onChange={(e)=>{
                  let copy = [...register];
                  setName(e.target.value);
                  Signup("NAME",props.join,e.target.value) === ""
                  ? copy[3] = true : copy[3] = false 
                  setRegister(copy);
                }}/>
                 <p className="warning">{
                  name !== "" 
                  ? Signup("NAME",props.join,name)
                  : ""}</p>
              </li>  

              <li className="info email">
                <div className="infoname">?????????</div>
                <input type="email" className="input-info"  onChange={(e)=>{
                  let copy = [...register];
                  setEmail(e.target.value);
                  Signup("EMAIL",props.join,e.target.value) === "" 
                  ? copy[4] = true : copy[4] = false 
                  setRegister(copy);
                }}/>

                <p className="warning">{
                  email !== "" 
                  ? Signup("EMAIL",props.join,email)
                  : ""
                  
                  }
                </p> 
              </li>  

              <li className="info phone">
                <div className="infoname">????????????</div>
                <div className="phone-box" style={{paddingLeft:"0", marginLeft:"26px"}} >

                  <form onChange={()=>{
                      phone[1] !== '' && phone[2] !== '' 
                      ? register[5] = true : register[5] = false
                      setRegister(register)}}>
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
                      copy[1] = Signup("PHONE_first",props.join,e.target.value)
                      setPhone(copy);
                    }}/>

                    <span style={{margin:"0 5px"}}>-</span>
                    <input maxLength="4" className="phoneNum" onChange ={(e)=>{
                      let copy = [...phone];
                      copy[2] = Signup("PHONE_second",props.join,e.target.value)
                      setPhone(copy);
                    }}/>
                  </form>                
                </div>
              </li>    

              
              

             
            </ul>    
          </div>


          <div className="tou-container">
            <p className="tou-title">????????????</p>
            <div className="tou-box">
              <div className="all-check">
                <label className="check-custom">
                  <input type="checkbox" onChange={()=>{touallcheck()}}/>
                  <img src={allchecked} alt=""/>
                </label>
                <p>???????????? ??? ?????????????????? ??? ??????, ???????????? ??????(??????)??? ?????? ???????????????.</p>
              </div>

              {toutext.map((el,idx)=>{             
                return(
                  <div key={idx} className="tou">
                  <details className="toutext-box">  
                   <summary style={{}}>{toutext[idx].name}</summary>
                   <embed className="toutext" src={toutext[idx].embed}/>
                  </details>
                  <div className="touitem">
                    <p>{toutext[idx].text}</p>
                    <label className="check-custom">
                      <input type="checkbox" onChange={()=>{
                        toucheck(idx)}}/>
                      <img src={itemcheck[idx]} alt=""/>
                    </label>
                  </div>
                </div>
                )
              })}

            </div>
          </div>

          <div className="joinbtn-box">
            <button className="joinbtn" onClick={()=>{
               itemcheck[0] === check && itemcheck[1] === check
               ? register[6] = true : register[6] = false
               pwchk === pwconfirm && pwconfirm !== ""
               ? register[2] = true : register[2] = false

                console.log(register)
              
               setRegister(register)
              
              if(register.indexOf(false) === 0) {
                return console.log("????????? ????????? ?????????????????? ")
              } 
              else {
                register.includes(false,0)
                ? console.log("??????????????? ?????? ??????????????????")
                : memberInfo_push()
              }
                    
            }}>????????????</button>
          </div>
        </div>
      </div>
    )
}

export default Join