import { OrderedSet } from 'immutable';
import { FETCH_ITEMS_FAILURE, POST_ITEM_FAILURE, DISMISS_ERROR } from '../../../../src/constants/actionTypes.ts';
import { errorIdsReducer } from '../../../../src/reducers/ListItemReducers/errorReducers/errorIdsReducer.ts';

describe('ErrorIds Reducer correctly adds and removes  error Ids: ', () => {
  const fakeErrorId = '23456899-df58-1bbf-1j8p-4asd582z69d8';
  const text = 'some_Error';
  it('adds a new error id into an unexisting OrderedSet via fetch failure', () => {
    const action = { type: FETCH_ITEMS_FAILURE, payload: { id: fakeErrorId, text } };
    const expected = OrderedSet.of(fakeErrorId);

    const tested = errorIdsReducer(undefined, action);

    expect(tested).toEqual(expected);
  });

  it('adds a new error id into an unexisting OrderedSet via post failure', () => {
    const action = { type: POST_ITEM_FAILURE, payload: { id: fakeErrorId, text } };
    const expected = OrderedSet.of(fakeErrorId);

    const tested = errorIdsReducer(undefined, action);

    expect(tested).toEqual(expected);
  });

  it('adds a new error id into a nonempty OrderedSet via fetch failure', () => {
    const action = { type: FETCH_ITEMS_FAILURE, payload: { id: fakeErrorId, text } };
    const firstError = 's54d8e2x-15e8-4s52-e44s-ad71e2d5zz40';
    const initialState = OrderedSet.of(firstError);
    const expected = OrderedSet.of(firstError, fakeErrorId);

    const tested = errorIdsReducer(initialState, action);
    expect(tested).toEqual(expected);
  });

  it('adds a new error id into a nonempty OrderedSet via post failure', () => {
    const action = { type: POST_ITEM_FAILURE, payload: { id: fakeErrorId, text } };
    const firstError = 's54d8e2x-15e8-4s52-e44s-ad71e2d5zz40';
    const initialState = OrderedSet.of(firstError);
    const expected = OrderedSet.of(firstError, fakeErrorId);

    const tested = errorIdsReducer(initialState, action);
    expect(tested).toEqual(expected);
  });

  it('deletes an error id after dismissal of the error, expect an empty set', () => {
    const action = { type: DISMISS_ERROR, payload: { id: fakeErrorId } };
    const initialState = OrderedSet.of(fakeErrorId);
    const expected = OrderedSet();

    const tested = errorIdsReducer(initialState, action);

    expect(tested).toEqual(expected);
  });

  it('deletes an error id after dismissal of the error, expect a nonempty set', () => {
    const action = { type: DISMISS_ERROR, payload: { id: fakeErrorId } };
    const firstError = 's54d8e2x-15e8-4s52-e44s-ad71e2d5zz40';
    const initialState = OrderedSet.of(fakeErrorId, firstError);
    const expected = OrderedSet.of(firstError);

    const tested = errorIdsReducer(initialState, action);

    expect(tested).toEqual(expected);
  });

  it('does nothing with unknown action', () => {
    const action = { type: 'I AM UNKNOWN', payload: { id: fakeErrorId } };
    const initialState = OrderedSet.of(fakeErrorId);

    const tested = errorIdsReducer(initialState, action);

    expect(tested).toEqual(initialState);
  });
});
