import { Promise } from 'es6-promise';
import { postItemFactory } from '../../src/actionCreators/postItemFactory';
import { IAction } from '../../src/actionCreators/IAction';

describe('Correctly resolves postItem: ', () => {
  const items = [
    { Id: '98dbde18-639e-49a6-8e51-603ceb2ae92d', Text: 'text' },
    { Id: '1c353e0a-5481-4c31-bd2e-47e1baf84dbe', Text: 'giraffe' },
  ];
  const postSuccess = () => Promise.resolve({ json: () => Promise.resolve(items) });
  const postFailImmediately = () => Promise.reject(new Error('Items could not be posted'));
  const postFail = () => Promise.resolve({ json: () => Promise.reject(new Error('Items could not be posted')) });
  let fakeDispatch: jest.Mock<Dispatch>;
  const fakeAction = (payload: string): IAction => ({ type: 'unknown', payload });
  const fakeReceived = () => fakeAction('success');
  const fakeFailed = () => fakeAction('error');
  const fakeAddItem = () => fakeAction('add');
  const postItem = (post: () => Promise<ResponseWithJson>) => postItemFactory({
    success: fakeReceived,
    error: fakeFailed,
    itemAdd: fakeAddItem,
    post: post,
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
      const actual = fakeDispatch.mock.calls[1][0];

      expect(actual).toEqual(fakeFailed());
      expect(fakeDispatch.mock.calls.length).toBe(2);
    })
  );
});
