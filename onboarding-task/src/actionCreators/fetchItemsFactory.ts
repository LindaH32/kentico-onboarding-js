import { requestItems, receiveItems } from './actionCreators';
import { IAction } from './IAction';

export const fetchItemsFactory = (fetchFunction: () => Promise<Response>) => () => ((dispatch: Dispatch): Promise<IAction> => {
    dispatch(requestItems());

    return fetchFunction()
      .then(response => response.json())
      .then(json => dispatch(receiveItems(json)));
  }
);
