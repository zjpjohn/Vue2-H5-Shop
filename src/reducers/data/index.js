import {combineReducers} from 'redux';
import ActiveStatsReducer from './ActiveStatsReducer';
import RegistStatsReducer from './RegistStatsReducer';
import OrderStatsReducer from './OrderStatsReducer';
import SumStatsReducer from './SumStatsReducer';
import NewReducer from './NewReducer';
import CactiveReducer from './CactiveReducer';

export default combineReducers({
    CactiveStats:CactiveReducer,
    newStats:NewReducer,
    activeStats: ActiveStatsReducer,
    registStats: RegistStatsReducer,
    orderStats: OrderStatsReducer,
    sumStats: SumStatsReducer,
})
