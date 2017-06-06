import { fetchItemsFactory } from '../../src/actionCreators/fetchItemsFactory.ts';
import { requestItems, succeedToReceiveItems, failToReceiveItems } from '../../src/actionCreators/actionCreators.ts';

describe('Correctly resolves promises: ', () => {
  const item = { Id: '98dbde18-639e-49a6-8e51-603ceb2ae92d', Text: 'text' };

  const fetchFunction = () => (
    new Promise((resolve, reject) => {
      resolve(Response(item));
      reject({ error: 'Items could not be fetched' });
    })
  );

  const failingFetchFunction = () => (
    new Promise((resolve, reject) => {
      reject({ error: 'Items could not be fetched' });
    })
  );

  const fetchItems = fetchItemsFactory({
    requestFunction: requestItems,
    fetchFunction: () => fetchFunction(),
    successFunction: succeedToReceiveItems,
    errorFunction: failToReceiveItems,
  });

  const failingFetchItems = fetchItemsFactory({
    requestFunction: requestItems,
    fetchFunction: () => failingFetchFunction(),
    successFunction: succeedToReceiveItems,
    errorFunction: failToReceiveItems,
  });

  it('resolves fetchItems', (done) => {
    const expected = item;

    fetchItems.then(result => {
      expect(result).toEqual(expected);
      done();
    });
  });

  it('fails with error', (done) => {
    failingFetchItems.then(result =>
      fail('This can never happen. The catch block should be called immediately')
    )
    .catch(error => {
      expect(error).toBe('Items could not be fetched');
      done();
    });
  });
});
