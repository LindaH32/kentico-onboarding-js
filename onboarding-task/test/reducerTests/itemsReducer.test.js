import { Map } from 'immutable';
import { Item } from '../../src/models/Item.ts';
import { deleteItem, enableEditItem, saveChangesToItem, cancelChangesToItem } from '../../src/actionCreators/actionCreators.ts';
import { addItemFactory } from '../../src/actionCreators/addItemFactory.ts';
import { itemsReducer } from '../../src/reducers/ListItemReducers/itemsReducer.ts';

describe('Correctly creates reducers', () => {
  const id = '82xc89c4-s58s-55s6-2z57-10sd5w8a6h12';
  const text = 'test text';
  const initialItem = new Item({ text, id, isEdited: false });
  const initialState = Map({ [id]: initialItem });

  it('Reducer for adding an Item', () => {
    const fakeIdGenerator = () => '23456899-df58-1bbf-1j8p-4asd582z69d8';
    const fakeId = fakeIdGenerator();
    const itemInit = new Item({ text, id: fakeId, isEdited: false });
    const expected = Map({ [fakeId]: itemInit });
    const additionAction = addItemFactory(fakeIdGenerator)(text);

    const tested = itemsReducer(undefined, additionAction);

    expect(tested).toEqual(expected);
  });

  it('Reducer for deleting an Item', () => {
    const expected = Map();
    const deletionAction = deleteItem(id);

    const tested = itemsReducer(initialState, deletionAction);

    expect(tested).toEqual(expected);
  });

  it('Reducer for editing an Item', () => {
    const expectedItem = new Item({ id, text, isEdited: true });
    const expected = Map({ [id]: expectedItem });
    const editAction = enableEditItem(id);

    const tested = itemsReducer(initialState, editAction);

    expect(tested).toEqual(expected);
  });

  it('Reducer for saving the changes done to an Item', () => {
    const itemInit = new Item({ id, text, isEdited: true });
    const stateInit = Map({ [id]: itemInit });
    const editedText = 'text was changed';
    const expectedItem = new Item({ id, text: editedText, isEdited: false });
    const expected = Map({ [id]: expectedItem });
    const saveChangesAction = saveChangesToItem(id, editedText);

    const tested = itemsReducer(stateInit, saveChangesAction);

    expect(tested).toEqual(expected);
  });

  it('Reducer for cancelling the changes done to an Item', () => {
    const itemInit = new Item({ id, text, isEdited: true });
    const stateInit = Map({ [id]: itemInit });
    const cancelChangesAction = cancelChangesToItem(id);

    const tested = itemsReducer(stateInit, cancelChangesAction);

    expect(tested).toEqual(initialState);
  });

  it('Reducer with unknown action', () => {
    const unknownAction = { type: 'TEST_ME', payload: { id } };

    const tested = itemsReducer(initialState, unknownAction);

    expect(tested).toEqual(initialState);
  });
});
