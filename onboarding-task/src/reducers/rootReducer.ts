import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducer';
import { itemIdsReducer } from './itemIdsReducer';
import { fetchingFlagReducer } from './fetchingFlagReducer';

const rootReducer = combineReducers({
  items: itemsReducer,
  itemIds: itemIdsReducer,
  isFetching: fetchingFlagReducer,
});

export { rootReducer };
