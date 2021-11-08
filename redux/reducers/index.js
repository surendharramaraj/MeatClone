import {combineReducers} from 'redux';
import cartReducers from './cartReducers';

// let reducers = combineReducers({
//     cartReducer: cartReducers
// })
const rootReducers = (state, action) => {
    return cartReducers(state, action)
}

export default rootReducers;