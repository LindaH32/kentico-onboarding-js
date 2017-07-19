import { Promise } from 'es6-promise';
import { deleteItemFactory } from '../../src/actionCreators/internal/deleteItemFactory';
import { IAction } from '../../src/actionCreators/IAction';
import { IItemData } from '../../src/models/IItem';

describe('Correctly resolves deleteItem: ', () => {
  const fakeFirstId = '98dbde18-639e-49a6-8e51-603ceb2ae92d';
  const items = [
    { id: fakeFirstId, text: 'text', isEdited: false },
    { id: '1c353e0a-5481-4c31-bd2e-47e1baf84dbe', text: 'panda', isEdited: false },
  ];
  const deleteSuccess = () => Promise.resolve({ json: ((): Promise<IItemData> => Promise.resolve(items[0])) });
  const deleteFailImmediately = () => Promise.reject(new Error('Item could not be deleted'));
  const deleteFail = () => Promise.resolve({ json: (): Promise<Error> => Promise.reject(new Error('Item could not be deleted')) });
  let fakeDispatch: jest.Mock<Dispatch>;
  const fakeAction = (payload: string): IAction => ({ type: 'unknown', payload });
  const fakeReceived = () => fakeAction('success');
  const fakeFailed = () => fakeAction('error');
  const fakeRemoveItem = () => fakeAction('remove');
  const deleteItem = (itemDelete: () => Promise<{}>) => deleteItemFactory({
    success: fakeReceived,
    error: fakeFailed,
    itemRemove: fakeRemoveItem,
    deleteItem: itemDelete,
  });
  const testCases = [
    { name: ' succeeding', delete: deleteSuccess },
    { name: ' immediately failing', delete: deleteFailImmediately },
    { name: ' failing', delete: deleteFail },
  ];

  beforeEach((done) => {
    fakeDispatch = jest.fn((action) => action);
    done();
  });

  testCases.forEach(testCase => {
    it('dispatches addItems with' + testCase.name + ' delete', () => {
      deleteItem(testCase.delete)(fakeFirstId)(fakeDispatch);
      const actual = fakeDispatch.mock.calls[0];

      expect(actual[0]).toEqual(fakeRemoveItem());
    });
  });

  it('dispatches itemsReceived', () => {
    return deleteItem(deleteSuccess)(fakeFirstId)(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeReceived());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      });
  });

  it('fails with error immediately', () => {
    return deleteItem(deleteFailImmediately)(fakeFirstId)(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      });
  });

  it('fails with error', () => deleteItem(deleteFail)(fakeFirstId)(fakeDispatch)
    .then(() => {
      const actual = fakeDispatch.mock.calls[1][0];

      expect(actual).toEqual(fakeFailed());
      expect(fakeDispatch.mock.calls.length).toBe(2);
    })
  );
});
