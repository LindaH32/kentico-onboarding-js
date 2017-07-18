import { combineReducers } from 'redux';
import { itemsReducer } from './ListItemReducers/itemsReducers/itemsReducer';
import { itemIdsReducer } from './ListItemReducers/itemsReducers/itemIdsReducer';
import { fetchingFlagReducer } from './ListItemReducers/flagReducers/fetchingFlagReducer';
import { errorReducer } from './ListItemReducers/errorReducers/errorReducer';
import { postingFlagReducer } from './ListItemReducers/flagReducers/postingFlagReducer';
import { errorIdsReducer } from './ListItemReducers/errorReducers/errorIdsReducer';

const rootReducer = combineReducers({
  items: itemsReducer,
  itemIds: itemIdsReducer,
  isFetching: fetchingFlagReducer,
  isPosting: postingFlagReducer,
  errors: errorReducer,
  errorIds: errorIdsReducer,
});

export { rootReducer };
