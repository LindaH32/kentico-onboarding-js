import { IAction } from '../IAction';

interface IPutItemFactoryDependencies {
  success: (json: object) => IAction;
  error: (id: string, error: Error) => IAction;
  itemUpdate: (id: string, text: string) => IAction;
  put: (id: string, text: string) => Promise<ResponseWithJson>;
}

export const putItemFactory = (dependencies: IPutItemFactoryDependencies) => (id: string, text: string) => ((dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.itemUpdate(id, text));
    return dependencies.put(id, text)
      .then(response => response.json())
      .then(item => dispatch(dependencies.success(item)))
      .catch((error: Error) => dispatch(dependencies.error(id, error)));
  }
);
