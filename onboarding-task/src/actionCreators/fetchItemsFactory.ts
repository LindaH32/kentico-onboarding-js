import { IAction } from './IAction';

interface IFetchItemsFactoryDependencies {
  fetchBegin: () => IAction;
  success: (json: object) => IAction;
  error: (error: Error) => IAction;
  fetch: () => Promise<ResponseWithJson>;
}

export const fetchItemsFactory = (dependencies: IFetchItemsFactoryDependencies) => (dispatch: Dispatch): Promise<IAction> => {
  dispatch(dependencies.fetchBegin());

  return dependencies.fetch()
    .then(response => response.json())
    .then(json => dispatch(dependencies.success(json)))
    .catch((error: Error) => dispatch(dependencies.error(error)));
};
