import {combineReducers} from 'redux'
import product from './product'
import basket from './basket'
import join from './join'



const rootReducer = combineReducers({

    product,
    basket,
    join,


})



export default rootReducer