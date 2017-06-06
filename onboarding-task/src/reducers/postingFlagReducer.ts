import { IAction } from '../actionCreators/IAction';
import { POST_ITEMS_REQUEST, POST_ITEMS_SUCCESS } from '../constants/actionTypes';

const postingFlagReducer = (state = false, action: IAction): boolean => {
  switch (action.type) {
    case POST_ITEMS_REQUEST:
      return state = true;

    case POST_ITEMS_SUCCESS:
      return state = false;

    default:
      return state;
  }
};

export { postingFlagReducer };
