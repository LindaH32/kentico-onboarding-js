import { IAction } from './IAction';

interface IFetchItemsFactoryDependencies {
  fetchBegin: () => IAction;
  success: (json: object) => IAction;
  error: (id: string, error: Error) => IAction;
  fetch: () => Promise<Response>;
  idGenerator: () => string;
  checkStatus: (response: Response) => Response;
}

export const fetchItemsFactory = (dependencies: IFetchItemsFactoryDependencies) => (dispatch: Dispatch): Promise<IAction> => {
  dispatch(dependencies.fetchBegin());
  const errorId = dependencies.idGenerator();

  return dependencies.fetch()
    .then(response => dependencies.checkStatus(response))
    .then(response => response.json())
    .then(items => dispatch(dependencies.success(items)))
    .catch((error: Error) => dispatch(dependencies.error(errorId, error)));
};
