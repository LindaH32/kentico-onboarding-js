import { IAction } from './IAction';

interface IPostItemsFactoryDependencies {
  postBegin: () => IAction;
  post: (options: any) => Promise<ResponseWithJson>;
  success: (id: string) => IAction;
  error: (error: Error) => IAction;
}

export const postItemsFactory = (dependencies: IPostItemsFactoryDependencies) => (text: string) => ((dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.postBegin());

    return dependencies.post({
      body: { text },
    })
      .then(response => response.json())
      .then(id => dispatch(dependencies.success( id as string)))
      .catch((error: Error) => dispatch(dependencies.error(error)));
  }
);
