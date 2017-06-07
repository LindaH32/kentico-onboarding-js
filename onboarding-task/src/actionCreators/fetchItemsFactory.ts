import { IAction } from './IAction';

interface IFetchItemsFactoryDependencies {
  requestFunction: () => IAction;
  fetchFunction: () => Promise<Response2>;
  successFunction: (json: object) => IAction;
  errorFunction: (error: Error) => IAction;
}

export const fetchItemsFactory = (dependencies: IFetchItemsFactoryDependencies) => (dispatch: Dispatch): Promise<IAction> => {
  dispatch(dependencies.requestFunction());

  return dependencies.fetchFunction()
    .then(response => response.json())
    .then(json => dispatch(dependencies.successFunction(json)))
    .catch((error: Error) => dependencies.errorFunction(error));
};
