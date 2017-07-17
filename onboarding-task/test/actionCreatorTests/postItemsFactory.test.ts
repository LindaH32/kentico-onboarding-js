import { Promise } from 'es6-promise';
import { postItemFactory } from '../../src/actionCreators/postItemFactory';
import { IAction } from '../../src/actionCreators/IAction';
import { IItemData } from '../../src/models/IItem';

describe('Correctly resolves postItem: ', () => {
  const items = [
    { id: '98dbde18-639e-49a6-8e51-603ceb2ae92d', text: 'text' },
    { id: '1c353e0a-5481-4c31-bd2e-47e1baf84dbe', text: 'giraffe' },
  ];
  const postSuccess = () => Promise.resolve({ json: (): Promise<Partial<IItemData>[]> => Promise.resolve(items) });
  const postFailImmediately = () => Promise.reject(new Error('Items could not be posted'));
  const postFail = () => Promise.resolve({ json: () : Promise<Error> => Promise.reject(new Error('Items could not be posted')) });
  let fakeDispatch: jest.Mock<Dispatch>;
  const fakeAction = (payload: string): IAction => ({ type: 'unknown', payload });
  const fakeReceived = () => fakeAction('success');
  const fakeFailed = () => fakeAction('error');
  const fakeAddItem = () => fakeAction('add');
  const checkStatus = (response: Response) => response;
  const postItem = (post: () => Promise<{}>) => postItemFactory({
    success: fakeReceived,
    error: fakeFailed,
    itemAdd: fakeAddItem,
    post: post,
    checkStatus: checkStatus,
  });
  const testCases = [
    { name: ' succeeding', post: postSuccess },
    { name: ' immediately failing', post: postFailImmediately },
    { name: ' failing', post: postFail },
  ];

  beforeEach((done) => {
    fakeDispatch = jest.fn((action) => action);
    done();
  });

  testCases.forEach(testCase => {

    it('dispatches addItems with' + testCase.name + ' post', () => {
      postItem(testCase.post)('text')(fakeDispatch);
      const actual = fakeDispatch.mock.calls[0];

      expect(actual[0]).toEqual(fakeAddItem());
    });
  });

  it('dispatches itemsReceived', () => {
    return postItem(postSuccess)('text')(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeReceived());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      });
  });

  it('fails with error immediately', () => {
    return postItem(postFailImmediately)('text')(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      });
  });

  it('fails with error', () => postItem(postFail)('text')(fakeDispatch)
    .then(() => {
      const actual = fakeDispatch.mock.calls[1];

      expect(actual[0]).toEqual(fakeFailed());
      expect(fakeDispatch.mock.calls.length).toBe(2);
    })
  );
});
