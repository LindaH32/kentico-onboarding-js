import { IAction } from './IAction';

interface IPostItemsFactoryDependencies {
  requestFunction: () => IAction;
  postFunction: (url: string, options: any) => Promise<Response>;
  successFunction: (id: string) => IAction;
  errorFunction: (error: Error) => IAction;
}

export const postItemsFactory = (dependencies: IPostItemsFactoryDependencies) => (url: string, text: string) => ((dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.requestFunction());

    return dependencies.postFunction(url, {
      method: 'POST',
      body: { text },
    })
      .then(response => response.json())
      .then(id => dispatch(dependencies.successFunction(id)))
      .catch((error: Error) => dispatch(dependencies.errorFunction(error)));
  }
);
