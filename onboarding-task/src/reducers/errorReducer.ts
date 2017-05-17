import { IAction } from '../actionCreators/IAction';
import { FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE } from '../constants/actionTypes';
const errorReducer = (state = null, action: IAction): any => {
  switch (action.type) {

    case FETCH_ITEMS_SUCCESS:
      return state = null;

    case FETCH_ITEMS_FAILURE:
      return state = action.payload.errorMessage;

    default:
      return state;
  }
};

export { errorReducer };
