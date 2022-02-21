import { combineReducers } from 'redux';

import cart from './reducers/cart';
import tab from './reducers/tab';

const rootReducer = combineReducers({
    cart: cart,
    tab: tab,
});

export default rootReducer;