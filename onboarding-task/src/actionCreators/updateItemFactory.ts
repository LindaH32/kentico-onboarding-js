import { IAction } from './IAction';
import { IItemData } from '../models/IItem';

interface IUpdateItemFactoryDependencies {
  success: (json: object) => IAction;
  error: (id: string, error: Error) => IAction;
  itemUpdate: (id: string, text: string) => IAction;
  update: (body: Partial<IItemData>) => Promise<ResponseWithJson>;
}

export const updateItemFactory = (dependencies: IUpdateItemFactoryDependencies) => (id: string, text: string) => ((dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.itemUpdate(id, text));
    return dependencies.update({ text })
      .then(response => response.json())
      .then(item => dispatch(dependencies.success(item)))
      .catch((error: Error) => dispatch(dependencies.error(id, error)));
  }
);
