import { IAction } from '../../../actionCreators/IAction';
import {
  POST_ITEM_FAILURE, ADD_ITEM, POST_ITEM_SUCCESS
} from '../../../constants/actionTypes';

const postingFlagReducer = (state = false, action: IAction): boolean => {
  switch (action.type) {
    case ADD_ITEM:
      return state = true;

    case POST_ITEM_SUCCESS:
    case POST_ITEM_FAILURE:
      return state = false;

    default:
      return state;
  }
};

export { postingFlagReducer };
