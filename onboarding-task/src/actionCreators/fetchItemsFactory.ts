import { requestItems, receiveItems } from './actionCreators';

export const fetchItemsFactory = (fetchFunction: () => Promise<any>) => ((dispatch: Dispatch) => {
    dispatch(requestItems());

    return fetchFunction()
      .then(json => dispatch(receiveItems(json)));
  }
);
