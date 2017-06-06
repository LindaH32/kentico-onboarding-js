import { IAction } from './IAction';

interface IFetchItemsFactoryDependencies {
  requestFunction: () => IAction;
  fetchFunction: () => Promise<Response>;
  successFunction: (json: object) => IAction;
  errorFunction: (error: Error) => IAction;
}

export const fetchItemsFactory = (dependencies: IFetchItemsFactoryDependencies) => () => ((dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.requestFunction());

    return dependencies.fetchFunction()
      .then(response => response.json())
      .then(json => dispatch(dependencies.successFunction(json)))
      .catch((error: Error) => dispatch(dependencies.errorFunction(error)));
  }
);
