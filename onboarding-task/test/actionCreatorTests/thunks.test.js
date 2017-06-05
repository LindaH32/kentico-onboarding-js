import { fetchItemsFactory } from '../../src/actionCreators/fetchItemsFactory.ts';
import { FETCH_ITEMS_REQUEST, REQUEST_ITEMS, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE } from '../../src/constants/actionTypes.ts';

describe('Correctly resolves promises: ', () => {
  const item = { Id: '98dbde18-639e-49a6-8e51-603ceb2ae92d', Text: 'text'};
  const requestAction = {
    type: FETCH_ITEMS_REQUEST,
    payload: {},
  };

  const receiveAction = {
    type: FETCH_ITEMS_SUCCESS,
    payload: { items: { 'Id': '98dbde18-639e-49a6-8e51-603ceb2ae92d', 'Text': 'text' } },
  };

  const errorAction = {
    type: FETCH_ITEMS_FAILURE,
    payload: { errorMessage: 'Items were not fetched' },
  };

  it('resolves fetchItems', () => {
    return new Promise((resolve, reject) => {
      const fetchFunction = () => () => item;

      const fetchItems = fetchItemsFactory({
        requestFunction: () => requestAction,
        fetchFunction,
        successFunction: () => receiveAction,
        errorFunction: () => errorAction,
      });
      const tested = fetchItems();

      process.nextTick(tested ? resolve(item) : reject('Items were not fetched'));
    });

    //
    // fetchItems.then();
    // const disp = () => undefined;
    // promise
    //   .then(() => done())
    //   .catch(() => {
    //     fail('failed');
    //     done();
    //   });
  });
});
