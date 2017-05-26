import { requestItems, receiveItems, failToReceiveItems } from './actionCreators';
import { IAction } from './IAction';

export const fetchItemsFactory = (fetchFunction: () => Promise<Response>) => () => ((dispatch: Dispatch): Promise<IAction> => {
    dispatch(requestItems());

    return fetchFunction()
      .then(response => response.json())
      .then(json => dispatch(receiveItems(json)))
      .catch((error: Error) => dispatch(failToReceiveItems(error)));
  }
);

export const postItemsFactory = (postFunction: (url: string, options: any) => Promise<Response>) => (url: string, text: string) => ((dispatch: Dispatch): Promise<IAction> => {
    dispatch(requestItems());

    return postFunction(url, {
      method: 'POST',
      body: { text },
    })
      .then(response => response.json())
      .then(json => dispatch(receiveItems(json)));
  }
);
