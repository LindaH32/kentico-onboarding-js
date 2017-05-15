import { OrderedSet } from 'immutable';
import { ADD_ITEM, DELETE_ITEM, RECEIVE_ITEMS } from '../constants/actionTypes';
import { IAction } from '../actionCreators/IAction';
import { IReceivedItem } from './IRecievedItem';

const itemIdsReducer = (state: OrderedSet<string> = OrderedSet<string>(), action: IAction): OrderedSet<string> => {
  switch (action.type) {
    case RECEIVE_ITEMS: {
      const receivedObjects = action.payload.items;
      const itemIds = receivedObjects.map((value: IReceivedItem) => value.Id);
      return state.merge(itemIds);
    }
    case ADD_ITEM:
      return state.add(action.payload.id);

    case DELETE_ITEM: {
      return state.delete(action.payload.id);
    }

    default:
      return state;
  }
};

export { itemIdsReducer };
