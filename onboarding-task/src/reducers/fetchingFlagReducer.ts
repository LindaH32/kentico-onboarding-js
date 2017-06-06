import { IAction } from '../actionCreators/IAction';
import { FETCH_ITEMS_FAILURE, FETCH_ITEMS_REQUEST, FETCH_ITEMS_SUCCESS } from '../constants/actionTypes';
const fetchingFlagReducer = (state = false, action: IAction): boolean => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return state = true;

    case FETCH_ITEMS_SUCCESS:
    case FETCH_ITEMS_FAILURE:
      return state = false;

    default:
      return state;
  }
};

export { fetchingFlagReducer };
