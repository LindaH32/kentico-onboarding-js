import { IAction } from './IAction';

interface IPostItemsFactoryDependencies {
  postBegin: () => IAction;
  success: (id: string) => IAction;
  error: (error: Error) => IAction;
  itemAdd: (text: string) => IAction;
  post: (options: any) => Promise<ResponseWithJson>;
}

export const postItemsFactory = (dependencies: IPostItemsFactoryDependencies) => (text: string) => ((dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.postBegin());
    dispatch(dependencies.itemAdd(text));

    return dependencies.post({
      body: { text },
    })
      .then(response => response.json())
      .then(id => dispatch(dependencies.success( id as string)))
      .catch((error: Error) => dispatch(dependencies.error(error)));
  }
);
