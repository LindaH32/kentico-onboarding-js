import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducer';
import { itemIdsReducer } from './itemIdsReducer';
import { fetchingFlagReducer } from './fetchingFlagReducer';
import { errorReducer } from './errorReducer';
import { postingFlagReducer } from './postingFlagReducer';

const rootReducer = combineReducers({
  items: itemsReducer,
  itemIds: itemIdsReducer,
  isFetching: fetchingFlagReducer,
  isPosting: postingFlagReducer,
  errorMessage: errorReducer,
});

export { rootReducer };
