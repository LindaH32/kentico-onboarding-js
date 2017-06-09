import { OrderedSet } from 'immutable';
import {
  ADD_ITEM, DELETE_ITEM,
  FETCH_ITEMS_SUCCESS,
  POST_ITEMS_SUCCESS
} from '../constants/actionTypes';
import { IAction } from '../actionCreators/IAction';
import { IReceivedViaFetchItem } from './IRecievedItem';

const itemIdsReducer = (state: OrderedSet<string> = OrderedSet<string>(), action: IAction): OrderedSet<string> => {
  switch (action.type) {
    case FETCH_ITEMS_SUCCESS: {
      const receivedObjects = action.payload.items;
      const itemIds = receivedObjects.map((value: IReceivedViaFetchItem) => value.Id);
      return state.merge(itemIds);
    }

    case ADD_ITEM:
      return state.add(action.payload.id);

    case DELETE_ITEM: {
      return state.delete(action.payload.id);
    }

    case POST_ITEMS_SUCCESS: {
      const oldId = action.payload.id;
      const serverId = action.payload.serverId;
      state.delete(oldId);

      return state.add(serverId);

    }

    default:
      return state;
  }
};

export { itemIdsReducer };
