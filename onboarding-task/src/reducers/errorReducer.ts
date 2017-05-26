import { IAction } from '../actionCreators/IAction';
import { FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE, FETCH_ITEMS_REQUEST } from '../constants/actionTypes';
const errorReducer = (state = '', action: IAction): string => {
  switch (action.type) {

    case FETCH_ITEMS_REQUEST:
    case FETCH_ITEMS_SUCCESS:
      return state = '';

    case FETCH_ITEMS_FAILURE:
      return state = action.payload.errorMessage;

    default:
      return state;
  }
};

export { errorReducer };
