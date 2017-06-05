import { requestItems, receiveItems } from './actionCreators';
import { IAction } from './IAction';

interface IfetchItemsFactoryDependencies {
  requestFunction: () => IAction;
  fetchFunction: () => Promise<Response>;
  successFunction: (json: object) => IAction;
  errorFunction: (error: Error) => IAction;
}

export const fetchItemsFactory = (dependencies: IfetchItemsFactoryDependencies) => () => ((dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.requestFunction());

    return dependencies.fetchFunction()
      .then(response => response.json())
      .then(json => dispatch(dependencies.successFunction(json)))
      .catch((error: Error) => dispatch(dependencies.errorFunction(error)));
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
