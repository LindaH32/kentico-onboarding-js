import { IAction } from './IAction';

interface IUpdateItemFactoryDependencies {
  success: (json: object) => IAction;
  error: (id: string, error: Error) => IAction;
  itemUpdate: (id: string, text: string) => IAction;
  update: (id: string, text: string) => Promise<ResponseWithJson>;
}

export const updateItemFactory = (dependencies: IUpdateItemFactoryDependencies) => (id: string, text: string) => ((dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.itemUpdate(id, text));
    return dependencies.update(id, text)
      .then(response => response.json())
      .then(item => dispatch(dependencies.success(item)))
      .catch((error: Error) => dispatch(dependencies.error(id, error)));
  }
);
