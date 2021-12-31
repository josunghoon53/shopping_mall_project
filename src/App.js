import './App.css';
import { useEffect, useState} from 'react';
import {Route,Switch} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {getData} from './modules/product'
import ProductPg from './pages/productPg'
import Toplist from './component/Toplist'
import Detail from './pages/detailPg';
import Footer from './component/Footer';
import Header from './component/Header';
import Main from './component/Main';
import Basket from './pages/basketPg';
import Join from './pages/joinPg'



function App(props) {

  let[slide,setSlide] = useState(['main_1.png','main_2.png','main_3.png'])
  let slideSrc = './img/';
  let [headon,setHeadon] = useState(false);
  let state  = useSelector((state)=> state.product);
  let basket = useSelector((state)=> state.basket);
  let join = useSelector((state)=> state.join);

  const dispatch = useDispatch();  

  useEffect(()=>{
    getData().then((result)=>{
      dispatch(result);
    })
  },[])
    

  
 

  /*스크롤이벤트*/
  useEffect(() => {
    const  ScrollFunc = () => {
      if(window.pageYOffset <= 99){
        setHeadon(false);
      } else{
        setHeadon(true);
      }
    } 
    window.addEventListener("scroll", ScrollFunc);
    return () => {
      window.removeEventListener("scroll", ScrollFunc);
    };
  });

  return (
      <div className="App"> 
        <Header headon = {headon}/>
        <Switch>
          <Route exact path="/"> 
            {/*메인 이미지 슬라이드 구현 <미완>*/}
            <Main slide = {slide} 
                  slideSrc = {slideSrc}
                  setSlide={setSlide}/>           
            <Toplist state = {state}/>            
          </Route>
          <Route  path="/product"><ProductPg state = {state}/></Route>
          <Route  path="/detail/:id"><Detail state = {state}/></Route>
          <Route  path ="/cart"><Basket basket = {basket} state ={state} /></Route>
          <Route  path ="/join"><Join join = {join}/></Route>
        </Switch>
        <Footer/>
      </div>
  );
}


export default App;
