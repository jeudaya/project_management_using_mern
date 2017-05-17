
import { createStore ,applyMiddleware} from 'redux';
import reducer from './reducers'
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import promise from 'redux-promise-middleware'
const middleware=applyMiddleware(promise(),thunk);
export default createStore(reducer,middleware);