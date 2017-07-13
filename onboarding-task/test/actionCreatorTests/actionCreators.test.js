import {
  removeItem,
  enableEditItem,
  saveChangesToItem,
  cancelChangesToItem,
  requestItems,
  succeedToFetchItems,
  failToFetchItems,
  succeedToPostItem,
  failToPostItems,
  succeedToDeleteItem,
  failToDeleteItems,
  succeedToUpdateItem,
  failToUpdateItem,
} from '../../src/actionCreators/actionCreators.ts';
import { addItemFactory } from '../../src/actionCreators/addItemFactory.ts';
import {
  ADD_ITEM,
  DELETE_ITEM,
  ENABLE_EDIT_ITEM,
  SAVE_CHANGES_TO_ITEM,
  CANCEL_CHANGES_TO_ITEM,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  POST_ITEM_SUCCESS,
  POST_ITEM_FAILURE,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILURE,
} from '../../src/constants/actionTypes.ts';

describe('Correctly creates actions', () => {
  const fakeId = '07b2b519-e303-1bbf-8ba7-9b986a0d15fc';
  const generateFakeId = () => '11111111-e303-1bbf-8ba7-9b986a0d15fc';
  const text = 'test text';

  it('Action to add an item', () => {
    const expectedAction = {
      type: ADD_ITEM,
      payload: { id: generateFakeId(), text } };

    const testedAction = addItemFactory(generateFakeId)(text);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action to delete an item', () => {
    const expectedAction = {
      type: DELETE_ITEM,
      payload: { id: fakeId },
    };

    const testedAction = removeItem(fakeId);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action to edit an item', () => {
    const expectedAction = {
      type: ENABLE_EDIT_ITEM,
      payload: { id: fakeId },
    };

    const testedAction = enableEditItem(fakeId);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action to save the changes done to an item', () => {
    const expectedAction = {
      type: SAVE_CHANGES_TO_ITEM,
      payload: { id: fakeId, text },
    };

    const testedAction = saveChangesToItem(fakeId, text);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action to delete the changes done to an item', () => {
    const expectedAction = {
      type: CANCEL_CHANGES_TO_ITEM,
      payload: { id: fakeId },
    };

    const testedAction = cancelChangesToItem(fakeId);

    expect(expectedAction).toEqual(testedAction);
  });

  it('Action to request items', () => {
    const expectedAction = {
      type: FETCH_ITEMS_REQUEST,
      payload: {},
    };

    const testedAction = requestItems();

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action to receive items', () => {
    const jsonItem = '[{"Id":"98dbde18-639e-49a6-8e51-603ceb2ae92d","Text":"text"}]';
    const expectedAction = {
      type: FETCH_ITEMS_SUCCESS,
      payload: { items: jsonItem },
    };

    const testedAction = succeedToFetchItems(jsonItem);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action when failed receiving the items with an error message', () => {
    const receivedError = new Error('Failed to receive items');
    const expectedAction = {
      type: FETCH_ITEMS_FAILURE,
      payload: { id: fakeId, errorMessage: 'Failed to receive items' },
    };

    const testedAction = failToFetchItems(fakeId, receivedError);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action when failed receiving the items with no error message', () => {
    const receivedError = new Error();
    const expectedAction = {
      type: FETCH_ITEMS_FAILURE,
      payload: { id: fakeId, errorMessage: 'Items were not fetched' },
    };

    const testedAction = failToFetchItems(fakeId, receivedError);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action when succeeding to post items', () => {
    const itemId = '98dbde18-639e-49a6-8e51-603ceb2ae92d';
    const expectedAction = {
      type: POST_ITEM_SUCCESS,
      payload: { item: itemId, oldId: fakeId },
    };

    const testedAction = succeedToPostItem(itemId, fakeId);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action when failed posting the items with an error message', () => {
    const receivedError = new Error('Failed to post items');
    const expectedAction = {
      type: POST_ITEM_FAILURE,
      payload: { id: fakeId, errorMessage: 'Failed to post items' },
    };

    const testedAction = failToPostItems(fakeId, receivedError);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action when failed posting the items with no error message', () => {
    const receivedError = new Error();
    const expectedAction = {
      type: POST_ITEM_FAILURE,
      payload: { id: fakeId, errorMessage: 'Items were not posted' },
    };

    const testedAction = failToPostItems(fakeId, receivedError);

    expect(testedAction).toEqual(expectedAction);
  });


  it('Action when succeeding to delete items', () => {
    const deletedItem = { id: fakeId, text };
    const expectedAction = {
      type: DELETE_ITEM_SUCCESS,
      payload: { item: deletedItem },
    };

    const testedAction = succeedToDeleteItem(deletedItem);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action when failed deleting the items - with an error message', () => {
    const receivedError = new Error('Failed to delete item');
    const expectedAction = {
      type: DELETE_ITEM_FAILURE,
      payload: { id: fakeId, errorMessage: 'Failed to delete item' },
    };

    const testedAction = failToDeleteItems(fakeId, receivedError);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action when failed deleting the items - with no error message', () => {
    const receivedError = new Error();
    const expectedAction = {
      type: DELETE_ITEM_FAILURE,
      payload: { id: fakeId, errorMessage: 'The item with the id ' + fakeId + ' was not deleted' },
    };

    const testedAction = failToDeleteItems(fakeId, receivedError);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action when succeeding to update items', () => {
    const updatedItem = { id: fakeId, text };
    const expectedAction = {
      type: UPDATE_ITEM_SUCCESS,
      payload: { item: updatedItem },
    };

    const testedAction = succeedToUpdateItem(updatedItem);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action when failed updating the items with an error message', () => {
    const receivedError = new Error('Failed to update item');
    const expectedAction = {
      type: UPDATE_ITEM_FAILURE,
      payload: { id: fakeId, errorMessage: 'Failed to update item' },
    };

    const testedAction = failToUpdateItem(fakeId, receivedError);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action when failed updating the items with no error message', () => {
    const receivedError = new Error();
    const expectedAction = {
      type: UPDATE_ITEM_FAILURE,
      payload: { id: fakeId, errorMessage: 'The item with the id ' + fakeId + ' was not updated' },
    };

    const testedAction = failToUpdateItem(fakeId, receivedError);

    expect(testedAction).toEqual(expectedAction);
  });
});
