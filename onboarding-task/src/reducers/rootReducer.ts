import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducer';
import { itemIdsReducer } from './itemIdsReducer';
import { fetchingFlagReducer } from './fetchingFlagReducer';
import { errorReducer } from './errorReducer';

const rootReducer = combineReducers({
  items: itemsReducer,
  itemIds: itemIdsReducer,
  isFetching: fetchingFlagReducer,
  errorMessage: errorReducer,
});

export { rootReducer };
