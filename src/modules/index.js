import {combineReducers} from 'redux'
import product from './product'
import basket from './basket'

const rootReducer = combineReducers({

    product,
    basket

})

export default rootReducer