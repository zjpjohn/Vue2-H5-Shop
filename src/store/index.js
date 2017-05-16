import { hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';// redux-thunk 支持 dispatch(function)，并且可以异步调用它
import createLogger from 'redux-logger';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';

//  任何被发送到 store 的 action 都会经过 middleware
const middlewares = [
    thunk,
    routerMiddleware(hashHistory),// hashHistory 路由将通过URL的hash部分（#）切换
    createLogger({ collapsed: true })// 调用日志打印方法
];

// store applyMiddleware() 将所有中间件组成一个数组，依次执行。
const store = createStore(rootReducer, applyMiddleware(...middlewares));
export default store;

// history
export const history = syncHistoryWithStore(hashHistory, store)
