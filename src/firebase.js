// Import the functions you need from the SDKs you need

//firebase.js
import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAFUySMejB7jEZpdHq3AWNP-AELAfhk-cA",
  authDomain: "shopping-mall-cdaf5.firebaseapp.com",
  projectId: "shopping-mall-cdaf5",
  storageBucket: "shopping-mall-cdaf5.appspot.com",
  messagingSenderId: "760853867590",
  appId: "1:760853867590:web:64398bfdfb8b29f1a32e47",
  measurementId: "G-WGMPP2S1TF"
};



// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();
const authService = firebase.auth();


// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };
export { authService };
