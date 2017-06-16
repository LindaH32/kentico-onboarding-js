import { Item } from '../models/Item';
import {
  ADD_ITEM,
  ENABLE_EDIT_ITEM,
  SAVE_CHANGES_TO_ITEM,
  CANCEL_CHANGES_TO_ITEM,
  POST_ITEM_SUCCESS,
} from '../constants/actionTypes';
import { IAction } from '../actionCreators/IAction';
import { IItem } from '../models/IItem';

const itemReducer = (state: IItem = new Item(), action: IAction): IItem => {
  switch (action.type) {
    case ADD_ITEM: {
      const item = state.with({ id: action.payload.id, text: action.payload.text, isEdited: false });
      return item;
    }

    case ENABLE_EDIT_ITEM:
      return state.with({ 'isEdited': true });

    case SAVE_CHANGES_TO_ITEM: {
      const changes = { text: action.payload.text, isEdited: false };
      return state.with(changes);
    }

    case POST_ITEM_SUCCESS:
      return state.with(action.payload.item);

    case CANCEL_CHANGES_TO_ITEM:
      return state.with({ 'isEdited': false });

    default:
      return state;
  }
};

export { itemReducer };

