import { OrderedSet } from 'immutable';
import {
  FETCH_ITEMS_FAILURE,
  POST_ITEM_FAILURE,
  DISMISS_ERROR,
} from '../constants/actionTypes';
import { IAction } from '../actionCreators/IAction';

const errorIdsReducer = (state: OrderedSet<string> = OrderedSet<string>(), action: IAction): OrderedSet<string> => {
  switch (action.type) {
    case DISMISS_ERROR:
      return state.delete(action.payload.id);

    case POST_ITEM_FAILURE:
    case FETCH_ITEMS_FAILURE: {
        return state.add(action.payload.id);
      }

    default:
      return state;
  }
};

export { errorIdsReducer };
