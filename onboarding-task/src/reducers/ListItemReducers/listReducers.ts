import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducers/itemsReducer';
import { itemIdsReducer } from './itemsReducers/itemIdsReducer';
import { fetchingFlagReducer } from './flagReducers/fetchingFlagReducer';
import { errorReducer } from './errorReducers/errorReducer';
import { postingFlagReducer } from './flagReducers/postingFlagReducer';
import { errorIdsReducer } from './errorReducers/errorIdsReducer';

const listReducers = combineReducers({
  items: itemsReducer,
  itemIds: itemIdsReducer,
  isFetching: fetchingFlagReducer,
  isPosting: postingFlagReducer,
  errors: errorReducer,
  errorIds: errorIdsReducer,
});

export { listReducers };
