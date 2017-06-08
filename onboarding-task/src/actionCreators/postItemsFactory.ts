import { IAction } from './IAction';

interface IPostItemsFactoryDependencies {
  requestFunction: () => IAction;
  postFunction: (options: any) => Promise<ResponseWithJson>;
  successFunction: (id: string) => IAction;
  errorFunction: (error: Error) => IAction;
}

export const postItemsFactory = (dependencies: IPostItemsFactoryDependencies) => (text: string) => ((dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.requestFunction());

    return dependencies.postFunction({
      body: { text },
    })
      .then(response => response.json())
      .then(id => dispatch(dependencies.successFunction( id as string)))
      .catch((error: Error) => dispatch(dependencies.errorFunction(error)));
  }
);
