import { Promise } from 'es6-promise';
import { fetchItemsFactory } from '../../src/actionCreators/internal/fetchItemsFactory';
import { IAction } from '../../src/actionCreators/IAction';
import { IItemData } from '../../src/models/IItem';

describe('Correctly resolves fetchItems: ', () => {
  const items = [
    {
      id: '98dbde18-639e-49a6-8e51-603ceb2ae92d',
      text: 'text',
      creationTime: '2017-07-18T11:35:46.794Z',
      updateTime: '2017-08-18T11:37:31.806Z'
    },
    {
      id: '1c353e0a-5481-4c31-bd2e-47e1baf84dbe',
      text: 'giraffe',
      creationTime: '2017-07-18T11:35:50.128Z',
      updateTime: '2017-08-18T11:37:31.806Z'
    },
  ];

  const fetchSuccess = () => Promise.resolve({ json: ((): Promise<Partial<IItemData>[]> => Promise.resolve(items)) });
  const fetchFailImmediately = () => Promise.reject(new Error('Items could not be fetched'));
  const fetchFail = () => Promise.resolve({ json: (): Promise<Error> => Promise.reject(new Error('Items could not be fetched')) });
  let fakeDispatch: jest.Mock<Dispatch>;
  const fakeAction = (payload: string): IAction => ({ type: 'unknown', payload });
  const fakeRequest = () => fakeAction('request items');
  const fakeReceived = () => fakeAction('success');
  const fakeFailed = () => fakeAction('error');
  const fakeIdGenerator = () => '98dbde18-639e-49a6-8e51-603ceb2ae92d';
  const testCases = [
    { name: ' succeeding', fetch: fetchSuccess },
    { name: ' immediately failing', fetch: fetchFailImmediately },
    { name: ' failing', fetch: fetchFail },
  ];
  const fetchItems = (fetch: () => Promise<{}>) => fetchItemsFactory({
    fetchBegin: fakeRequest,
    fetch: fetch,
    success: fakeReceived,
    error: fakeFailed,
    idGenerator: fakeIdGenerator,
  });

  beforeEach((done) => {
    fakeDispatch = jest.fn((action) => action);
    done();
  });

  testCases.forEach((testCase) => {
    it('dispatches requestItems with' + testCase.name + ' fetch', () => {
      fetchItems(testCase.fetch)(fakeDispatch);
      const actual = fakeDispatch.mock.calls[0];

      expect(actual[0]).toEqual(fakeRequest());
    });
  });

  it('dispatches itemsReceived', () => {
    return fetchItems(fetchSuccess)(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeReceived());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      });
  });

  it('fails with error immediately', () => {
    return fetchItems(fetchFailImmediately)(fakeDispatch)
      .then(() => {
         const actual = fakeDispatch.mock.calls[1];

         expect(actual[0]).toEqual(fakeFailed());
         expect(fakeDispatch.mock.calls.length).toBe(2);
      });
  });

  it('fails with error', () => fetchItems(fetchFail)(fakeDispatch)
    .then(() => {
      const actual = fakeDispatch.mock.calls[1];

      expect(actual[0]).toEqual(fakeFailed());
      expect(fakeDispatch.mock.calls.length).toBe(2);
    })
  );
});
