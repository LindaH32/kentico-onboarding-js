import Immutable from 'immutable';

import {
  UPDATE_TEXT_OF_ITEM,
  CREATE_ITEM_IN_LIST,
  DELETE_ITEM_FROM_LIST,
} from '../../constants/actionTypes';
import { itemReducer } from './itemReducer';

const itemsByIdsReducer = (prevState = new Immutable.Map(), action) => {
  switch (action.type) {
    case CREATE_ITEM_IN_LIST: {
      const newItem = itemReducer(undefined, action);
      return prevState.set(action.payload.id, newItem);
    }
    case UPDATE_TEXT_OF_ITEM: {
      const item = prevState.get(action.payload.id);
      return prevState.set(action.payload.id, itemReducer(item, action));
    }
    case DELETE_ITEM_FROM_LIST: {
      return prevState.delete(action.payload.id);
    }
    default:
      return prevState;
  }
};

export { itemsByIdsReducer };
