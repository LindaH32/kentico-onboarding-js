import { OrderedSet } from 'immutable';
import {
  ADD_ITEM,
  DELETE_ITEM,
  FETCH_ITEMS_SUCCESS,
  POST_ITEM_SUCCESS
} from '../constants/actionTypes';
import { IAction } from '../actionCreators/IAction';
import { IItemData } from '../models/IItem';

const itemIdsReducer = (state: OrderedSet<string> = OrderedSet<string>(), action: IAction): OrderedSet<string> => {
  switch (action.type) {
    case FETCH_ITEMS_SUCCESS: {
      const receivedObjects = action.payload.items;
      const itemIds = receivedObjects.map((value: Partial<IItemData>) => value.id);

      return state.merge(itemIds);
    }

    case ADD_ITEM:
      return state.add(action.payload.id);

    case DELETE_ITEM: {
      return state.delete(action.payload.id);
    }

    case POST_ITEM_SUCCESS: {
      const oldId = action.payload.oldId;
      const serverId = action.payload.item.id;

      return state
        .map(id => (id === oldId) ?  serverId : id)
        .toOrderedSet();
    }

    default:
      return state;
  }
};

export { itemIdsReducer };
