import { fetchingFlagReducer } from '../../src/reducers/fetchingFlagReducer.ts';
import { REQUEST_ITEMS, RECEIVE_ITEMS } from '../../src/constants/actionTypes.ts';

describe('Correctly changes the fetch items flag', () => {
  it('changes the fetchingFlag when requesting items to true', () => {
    const requestAction = { type: REQUEST_ITEMS };

    const tested = fetchingFlagReducer(undefined, requestAction);

    expect(tested).toEqual(true);
  });

  it('chages the fetchingFlag when items are received to false', () => {
    const requestAction = { type: RECEIVE_ITEMS };

    const tested = fetchingFlagReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('returns the given state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = fetchingFlagReducer(true, requestAction);

    expect(tested).toEqual(true);
  });
});
