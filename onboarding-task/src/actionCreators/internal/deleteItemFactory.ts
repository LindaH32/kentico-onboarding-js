import { IAction } from '../IAction';

interface IDeleteItemFactoryDependencies {
  success: (json: object) => IAction;
  error: (id: string, error: Error) => IAction;
  itemRemove: (id: string) => IAction;
  deleteItem: (id: string) => Promise<ResponseWithJson>;
}

export const deleteItemFactory = (dependencies: IDeleteItemFactoryDependencies) => (id: string) => ((dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.itemRemove(id));

    return dependencies.deleteItem(id)
      .then(response => response.json())
      .then(item => dispatch(dependencies.success(item)))
      .catch((error: Error) => dispatch(dependencies.error(id, error)));
  }
);
