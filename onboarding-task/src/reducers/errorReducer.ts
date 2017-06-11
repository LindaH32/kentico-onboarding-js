import { IAction } from '../actionCreators/IAction';
import {
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  FETCH_ITEMS_REQUEST,
  POST_ITEMS_FAILURE,
  POST_ITEMS_SUCCESS,
  ADD_ITEM, DISMISS_ERROR,
} from '../constants/actionTypes';
const errorReducer = (state = '', action: IAction): string => {
  switch (action.type) {

    case FETCH_ITEMS_REQUEST:
    case FETCH_ITEMS_SUCCESS:
    case ADD_ITEM:
    case POST_ITEMS_SUCCESS:
    case DISMISS_ERROR:
      return state = '';

    case FETCH_ITEMS_FAILURE:
      return state = action.payload.errorMessage;

    case POST_ITEMS_FAILURE:
      return state = action.payload.errorMessage;

    default:
      return state;
  }
};

export { errorReducer };
