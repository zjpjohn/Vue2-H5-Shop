import {combineReducers} from 'redux';
import {BargraphReducer} from './BargraphReducer';
import {PiegraphReducer} from './PiegraphReducer';

export default combineReducers({
    bargraph: BargraphReducer,
    piegraph: PiegraphReducer,
})
