import { Map } from 'immutable';
import {
  ADD_ITEM,
  DELETE_ITEM,
  ENABLE_EDIT_ITEM,
  SAVE_CHANGES_TO_ITEM,
  CANCEL_CHANGES_TO_ITEM,
  FETCH_ITEMS_SUCCESS,
  POST_ITEM_SUCCESS,
} from '../../constants/actionTypes';
import { IAction } from '../../actionCreators/IAction';
import { IItem, IItemData } from '../../models/IItem';
import { Item } from '../../models/Item';
import { itemReducer } from './itemReducer';

const itemsReducer = (state: Map<string, IItem> = Map<string, IItem>(), action: IAction): Map<string, IItem> => {
  switch (action.type) {
    case FETCH_ITEMS_SUCCESS: {
      const items = action
        .payload
        .items
        .map((value: IItemData) =>
          [value.id, new Item({ id: value.id, text: value.text, isEdited: false })]);
      return state.merge(items);
    }

    case ADD_ITEM:
      return state.set(action.payload.id, itemReducer(undefined, action));

    case POST_ITEM_SUCCESS: {
      const currentItem = state.get(action.payload.oldId);
      const updatedItem = itemReducer(currentItem, action);

      return state
        .mapKeys((key: string) => (key === action.payload.oldId) ? updatedItem.id : key)
        .toMap()
        .set(updatedItem.id, updatedItem);
    }

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case ENABLE_EDIT_ITEM:
    case SAVE_CHANGES_TO_ITEM:
    case CANCEL_CHANGES_TO_ITEM: {
      const currentItem = state.get(action.payload.id);
      const editedItem = itemReducer(currentItem, action);

      return state.set(action.payload.id, editedItem);
    }

    default:
      return state;
  }
};

export { itemsReducer };
