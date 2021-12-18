/* eslint-disable default-case */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore } from 'redux';
import  axios from 'axios';


let defaultState = [{}]

function reducer(state = defaultState, action) {

  switch(action.type) {

    case "SET": 
      return state = action.payload
    
    case "SORT_DESC": 
      let copy_d = [...state];
      copy_d.sort(function(a,b) {
        return parseFloat(b.price)-parseFloat(a.price) 
      })
      return copy_d;
    
    case "SORT_ASC":
      let copy_a = [...state];
      copy_a.sort(function(a,b) {
        return parseFloat(a.price)-parseFloat(b.price) 
      })
      return copy_a;  
    
  }

}

export async function getData(){
  const product = await axios.get("/Data.json");
  return {
    type : "SET",
    payload : product.data
  }
}

let store = createStore(reducer)
window.store = store;


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter >
      <Provider store = {store}>
      <App/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
