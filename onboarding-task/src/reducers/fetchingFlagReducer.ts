import { IAction } from '../actionCreators/IAction';
import { REQUEST_ITEMS, RECEIVE_ITEMS } from '../constants/actionTypes';
const fetchingFlagReducer = (state = false, action: IAction): boolean => {
  switch (action.type) {
    case REQUEST_ITEMS:
      return state = true;

    case RECEIVE_ITEMS:
      return state = false;

    default:
      return state;
  }
};

export { fetchingFlagReducer };
