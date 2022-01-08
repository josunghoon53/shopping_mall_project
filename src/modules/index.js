import {combineReducers} from 'redux'
import product from './product'
import basket from './basket'
import join from './join'
import info from './info'

const rootReducer = combineReducers({

    product,
    basket,
    join,
    info

})



export default rootReducer