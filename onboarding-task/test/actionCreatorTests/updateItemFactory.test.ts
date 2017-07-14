import { Promise } from 'es6-promise';
import { putItemFactory } from '../../src/actionCreators/putItemFactory';
import { IAction } from '../../src/actionCreators/IAction';

describe('Correctly resolves updateItem: ', () => {
  const firstFakeId = '98dbde18-639e-49a6-8e51-603ceb2ae92d';
  const items = [
    { Id: firstFakeId, Text: 'text' },
    { Id: '1c353e0a-5481-4c31-bd2e-47e1baf84dbe', Text: 'panda' },
  ];
  const putSuccess = () => Promise.resolve({ json: () => Promise.resolve(items) });
  const putFailImmediately = () => Promise.reject(new Error('Items could not be updated'));
  const putFail = () => Promise.resolve({ json: () => Promise.reject(new Error('Items could not be updated')) });
  let fakeDispatch: jest.Mock<Dispatch>;
  const fakeAction = (payload: string): IAction => ({ type: 'unknown', payload });
  const fakeUpdated = () => fakeAction('success');
  const fakeFailed = () => fakeAction('error');
  const fakeItemUpdate = () => fakeAction('update');
  const putItem = (put: () => Promise<ResponseWithJson>) => putItemFactory({
    success: fakeUpdated,
    error: fakeFailed,
    itemUpdate: fakeItemUpdate,
    put: put,
  });
  const testCases = [
    { name: ' succeeding', put: putSuccess },
    { name: ' immediately failing', put: putFailImmediately },
    { name: ' failing', put: putFail },
  ];

  beforeEach((done) => {
    fakeDispatch = jest.fn((action) => action);
    done();
  });

  testCases.forEach(testCase => {

    it('dispatches updateItems with' + testCase.name + ' update', () => {
      putItem(testCase.put)(firstFakeId, 'text')(fakeDispatch);
      const actual = fakeDispatch.mock.calls[0];

      expect(actual[0]).toEqual(fakeItemUpdate());
    });
  });

  it('dispatches itemsUpdated', () => {
    return putItem(putSuccess)(firstFakeId, 'text')(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeUpdated());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      });
  });

  it('fails with error immediately', () => {
    return putItem(putFailImmediately)(firstFakeId, 'text')(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      });
  });

  it('fails with error', () => putItem(putFail)(firstFakeId, 'text')(fakeDispatch)
    .then(() => {
      const actual = fakeDispatch.mock.calls[1][0];

      expect(actual).toEqual(fakeFailed());
      expect(fakeDispatch.mock.calls.length).toBe(2);
    })
  );
});
