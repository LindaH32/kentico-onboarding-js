import { fetchingFlagReducer } from '../../../../src/reducers/ListItemReducers/flagReducers/fetchingFlagReducer.ts';
import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
} from '../../../../src/constants/actionTypes.ts';

describe('Correctly changes the fetch items flag', () => {
  it('changes the fetchingFlag when requesting items to true', () => {
    const requestAction = { type: FETCH_ITEMS_REQUEST };

    const tested = fetchingFlagReducer(undefined, requestAction);

    expect(tested).toEqual(true);
  });

  it('chages the fetchingFlag when items are received to false', () => {
    const requestAction = { type: FETCH_ITEMS_SUCCESS };

    const tested = fetchingFlagReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('chages the fetchingFlag when items failed to be fetched to false', () => {
    const requestAction = { type: FETCH_ITEMS_FAILURE };

    const tested = fetchingFlagReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('returns the given state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = fetchingFlagReducer(true, requestAction);

    expect(tested).toEqual(true);
  });
});
