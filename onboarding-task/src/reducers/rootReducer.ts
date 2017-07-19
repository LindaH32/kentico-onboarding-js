import { combineReducers } from 'redux';
import { listReducers } from './ListItemReducers/listReducers';

const rootReducer = combineReducers({list: listReducers});

export { rootReducer };
