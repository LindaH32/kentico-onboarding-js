import { Map } from 'immutable';
import { dismissError, failToPostItems, failToFetchItems } from '../../../../src/actionCreators/actionCreators.ts';
import { errorReducer } from '../../../../src/reducers/ListItemReducers/errorReducers/errorReducer.ts';

describe('Error reducer works correctly with errors', () => {
  const id = '82xc89c4-s58s-55s6-2z57-10sd5w8a6h12';
  const errorMessage = 'test error';
  const initialError = 'error';
  const initialState = Map({ [id]: initialError });

  it('adds an Error via Fetch failure', () => {
    const fakeIdGenerator = () => '23456899-df58-1bbf-1j8p-4asd582z69d8';
    const fakeId = fakeIdGenerator();
    const errorInit = 'init error';
    const error = new Error('init error');
    const expected = Map({ [fakeId]: errorInit });
    const failingFetchAction = failToFetchItems(fakeId, error);

    const tested = errorReducer(undefined, failingFetchAction);

    expect(tested).toEqual(expected);
  });

  it('add an Error via Post failure', () => {
    const fakeIdGenerator = () => '23456899-df58-1bbf-1j8p-4asd582z69d8';
    const fakeId = fakeIdGenerator();
    const errorInit = 'init error';
    const error = new Error('init error');
    const expected = Map({ [fakeId]: errorInit });
    const failingFetchAction = failToPostItems(fakeId, error);

    const tested = errorReducer(undefined, failingFetchAction);

    expect(tested).toEqual(expected);
  });

  it('dismisses an Error', () => {
    const expected = Map();
    const dismissalAction = dismissError(id);

    const tested = errorReducer(initialState, dismissalAction);

    expect(tested).toEqual(expected);
  });

  it('does nothing with unknown action', () => {
    const unknownAction = { type: 'TEST_ME', payload: { id } };

    const tested = errorReducer(initialState, unknownAction);

    expect(tested).toEqual(initialState);
  });
});
