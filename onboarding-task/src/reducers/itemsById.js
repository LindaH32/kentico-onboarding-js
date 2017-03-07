import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM_TEXT } from '../actions/actionTypes.js';
import Immutable from 'immutable';
import { item } from './item';

const map = Immutable.Map();
const itemsById = (state = map, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return state.set(action.payload.guid, item(undefined, action));
    }
    case UPDATE_ITEM_TEXT: {
      const editedItem = state.get(action.payload.guid);
      return state.set(action.payload.guid, item(editedItem, action));
    }
    case DELETE_ITEM: {
      return state.delete(action.payload.guid);
    }
    default:
      return state;
  }
};

export { itemsById };
