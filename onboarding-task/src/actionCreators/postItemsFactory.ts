import { IAction } from './IAction';

interface IPostItemsFactoryDependencies {
  postBegin: () => IAction;
  success: (json: object, oldId: string) => IAction;
  error: (error: Error) => IAction;
  itemAdd: (text: string) => IAction;
  post: (options: any) => Promise<ResponseWithJson>;
}

export const postItemsFactory = (dependencies: IPostItemsFactoryDependencies) => (text: string) => ((dispatch: Dispatch): Promise<IAction> => {
    const clientId = dispatch(dependencies.itemAdd(text)).payload.id;
    console.log('postItemsFatory: ' + clientId);
    return dependencies.post({
      body: { text, id: '98dbde18-639e-49a6-8e51-603ceb2ae92d' },
    })
      .then(response => response.json())
      .then(json => dispatch(dependencies.success(json, clientId)))
      .catch((error: Error) => dispatch(dependencies.error(error)));
  }
);
