import { Promise } from 'es6-promise';
import { fetchItemsFactory } from '../../src/actionCreators/fetchItemsFactory';
import { IAction } from '../../src/actionCreators/IAction';

describe('Correctly resolves fetchItems: ', () => {
  const items = [
    { Id: '98dbde18-639e-49a6-8e51-603ceb2ae92d', Text: 'text' },
    { Id: '1c353e0a-5481-4c31-bd2e-47e1baf84dbe', Text: 'giraffe' },
  ];

  const fetchSuccess = () => Promise.resolve({ json: () => Promise.resolve(items) });
  const fetchFailImmediately = () => Promise.reject(new Error('Items could not be fetched'));
  const fetchFail = () => Promise.resolve({ json: () => Promise.reject(new Error('Items could not be fetched')) });
  let fakeDispatch: jest.Mock<Dispatch>;
  const fakeAction = (payload: string): IAction => ({ type: 'unknown', payload });
  const fakeRequest = () => fakeAction('request items');
  const fakeReceived = () => fakeAction('success');
  const fakeFailed = () => fakeAction('error');
  const fetchItems = (fetch: () => Promise<ResponseWithJson>) => fetchItemsFactory({
    fetchBegin: fakeRequest,
    fetch: fetch,
    success: fakeReceived,
    error: fakeFailed,
  });

  beforeEach((done) => {
    fakeDispatch = jest.fn((action) => action);
    done();
  });

  it('dispatches requestItems with succeeding fetch', () => {
    fetchItems(fetchSuccess)(fakeDispatch);
    const actual = fakeDispatch.mock.calls[0];

    expect(actual[0]).toEqual(fakeRequest());
  });

  it('dispatches requestItems with immediately failing fetch', () => {
    fetchItems(fetchFailImmediately)(fakeDispatch);
    const actual = fakeDispatch.mock.calls[0];

    expect(actual[0]).toEqual(fakeRequest());
  });

  it('dispatches requestItems with failing fetch', () => {
    fetchItems(fetchFail)(fakeDispatch);
    const actual = fakeDispatch.mock.calls[0];

    expect(actual[0]).toEqual(fakeRequest());
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
         const actual = fakeDispatch.mock.calls[1][0];

         expect(actual).toEqual(fakeFailed());
         expect(fakeDispatch.mock.calls.length).toBe(2);
      });
  });

  it('fails with error', () => fetchItems(fetchFail)(fakeDispatch)
    .then(() => {
      const actual = fakeDispatch.mock.calls[1][0];

      expect(actual).toEqual(fakeFailed());
      expect(fakeDispatch.mock.calls.length).toBe(2);
    })
  );
});
