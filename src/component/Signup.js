import {useState} from "react"
import { doc, getDoc } from "firebase/firestore";
import { authService, firestore } from "../firebase";

/* eslint-disable */

function Signup(i,memDB,chk) {


  const speChr = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
  const kor =  /[ㄱ-ㅎㅏ-ㅣ가-힣]/gi; 
  const eng = /[a-zA-Z]/gi;
  const eng_upper = /[A-Z]$/g;
  const num = /^[0-9]/gi;
  const num_pw = /[0-9]/gi;
  const name = /^[가-힣]{2,4}$/;
  const corrID = /^[a-z]+[a-z0-9]{3,19}$/g;
  const phone_first = /^[1-9]+[0-9]{2,3}/
  const phone_second = /[0-9]{3,4}/
  const email = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  let list = [];
  let bool =[];



  switch(i){

    case "ID": {

     
      if(memDB === false && chk !== ""){
        list.push("중복된 아이디입니다.")
      }

      else {
        if(corrID.test(chk)) {
          list.push("사용가능한 아이디입니다.");

        }
        else{
          if(chk.length <4 || chk.length > 20) {
            list.push("글자수는 4~20자 사이여야 합니다.");
          }
          if(chk.search(/\s/) !== -1) {
            list.push("공백은 포함할 수 없습니다")
          }
          if(speChr.test(chk)) {
            list.push("특수문자는 포함할 수 없습니다");
          }
          if(kor.test(chk)) {
            list.push("한글은 포함할 수 없습니다");
          }
          if(num.test(chk)) {
            list.push("숫자로 시작하거나 숫자로만 아이디를 만들 수 없습니다");
          }
          if(eng_upper.test(chk)) {
            list.push("영소문자로만 작성가능합니다.");
          }

        }
      }

      return list.join("\n");
    }

    case "PW": {
     
      if(chk === ""){     
        return ""
      }

      else {
        if(chk.length < 10 && chk.length > 0){
          return "10자리 ~ 16자리 이내로 입력해주세요.";
        }
        else if(chk.search(/\s/) !== -1){
          return "공백은 포함할 수 없습니다"
        } 
        else if((chk.search(num_pw) <0 && chk.search(eng) < 0)  ||
                (chk.search(eng)<0 && chk.search(speChr) <0) ||
                (chk.search(speChr)<0 && chk.search(num_pw)<0)) {
          return "영문,숫자,특문 중 2가지 이상 사용해주세요"
        }

        else {
          return "사용 가능한 패스워드입니다."
        }
        
      }

    }

    case "EMAIL": {
      

      if(email.test(chk)){
        
        return ""
       
      }
      else {
       
        return "유효한 이메일을 입력해주세요"
      }

    }

    case "NAME": {
     
      if(name.test(chk)){
       
        return "";
      }
      else {
       
        return "올바른 이름형식을 입력해주세요"
      }

    }
   
    case "PHONE_first": {
     
      if(phone_first.test(chk)){
       
        return chk;
      }
      else {
       
        return "";
      }

    }

    case "PHONE_second": {
     
      if(phone_second.test(chk)){
       
        return chk;
      }
      else {
       
        return "";
      }

    }
   

  }
}

export default Signup
