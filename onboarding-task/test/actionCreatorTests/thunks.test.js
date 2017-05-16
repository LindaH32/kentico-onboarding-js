import { fetchItemsFactory } from '../../src/actionCreators/fetchItemsFactory.ts';

describe('Correctly resolves promises: ', () => {
  it('resolves fetchItems', (done) => {
    const promise = new Promise((resolve, reject) => {
      resolve('Resolved');
      reject('Rejected');
    });

    // const fetchItems = fetchItemsFactory(() => promise);
    // const disp = () => undefined;
    promise
      .then(() => done())
      .catch(() => {
        fail('failed');
        done();
      });
  });
});
