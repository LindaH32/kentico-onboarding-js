import { requestItems, receiveItems } from './actionCreators';

export const fetchItemsFactory = (fetchFunction: () => Promise<Response>) => () => ((dispatch: Dispatch) => {
    dispatch(requestItems());

    return fetchFunction()
      .then(response => response.json())
      .then(json => dispatch(receiveItems(json)));
  }
);
