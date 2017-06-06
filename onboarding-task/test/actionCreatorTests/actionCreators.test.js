import {
  deleteItem,
  enableEditItem,
  saveChangesToItem,
  cancelChangesToItem,
  requestItems,
  receiveItems,
  failToReceiveItems,
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
} from '../../src/constants/actionTypes.ts';

describe('Correctly creates actions', () => {
  const fakeId = '07b2b519-e303-1bbf-8ba7-9b986a0d15fc';
  const generateFakeId = () => '11111111-e303-1bbf-8ba7-9b986a0d15fc';
  const text = 'test text';

  it('Action to add an item', () => {
    const expectedAction = { type: ADD_ITEM, payload: { id: generateFakeId(), text } };

    const testedAction = addItemFactory(generateFakeId)(text);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action to delete an item', () => {
    const expectedAction = { type: DELETE_ITEM, payload: { id: fakeId } };

    const testedAction = deleteItem(fakeId);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action to edit an item', () => {
    const expectedAction = { type: ENABLE_EDIT_ITEM, payload: { id: fakeId } };

    const testedAction = enableEditItem(fakeId);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action to save the changes done to an item', () => {
    const expectedAction = { type: SAVE_CHANGES_TO_ITEM, payload: { id: fakeId, text } };

    const testedAction = saveChangesToItem(fakeId, text);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action to delete the changes done to an item', () => {
    const expectedAction = { type: CANCEL_CHANGES_TO_ITEM, payload: { id: fakeId } };

    const testedAction = cancelChangesToItem(fakeId);

    expect(expectedAction).toEqual(testedAction);
  });

  it('Action to request items', () => {
    const expectedAction = { type: FETCH_ITEMS_REQUEST, payload: {} };

    const testedAction = requestItems();

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action to receive items', () => {
    const jsonItem = '[{"Id":"98dbde18-639e-49a6-8e51-603ceb2ae92d","Text":"text"}]';
    const expectedAction = { type: FETCH_ITEMS_SUCCESS, payload: { items: jsonItem } };

    const testedAction = receiveItems(jsonItem);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action when failed receiving the items with an error message', () => {
    const receivedError = new Error('Failed to receive items');
    const expectedAction = { type: FETCH_ITEMS_FAILURE, payload: { errorMessage: 'Failed to receive items' } };

    const testedAction = failToReceiveItems(receivedError);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action when failed receiving the items with no error message', () => {
    const receivedError = new Error();
    const expectedAction = { type: FETCH_ITEMS_FAILURE, payload: { errorMessage: 'Items were not fetched' } };

    const testedAction = failToReceiveItems(receivedError);

    expect(testedAction).toEqual(expectedAction);
  });
});
