import { postingFlagReducer } from '../../src/reducers/postingFlagReducer.ts';
import { POST_ITEMS_REQUEST, POST_ITEMS_SUCCESS, POST_ITEMS_FAILURE } from '../../src/constants/actionTypes.ts';

describe('Correctly changes the post items flag', () => {
  it('changes the postingFlag when trying to post items to true', () => {
    const requestAction = { type: POST_ITEMS_REQUEST };

    const tested = postingFlagReducer(undefined, requestAction);

    expect(tested).toEqual(true);
  });

  it('chages the postingFlag when items are posted to false', () => {
    const requestAction = { type: POST_ITEMS_SUCCESS };

    const tested = postingFlagReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('chages the postingFlag when items failed to be posted to false', () => {
    const requestAction = { type: POST_ITEMS_FAILURE };

    const tested = postingFlagReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('returns the given state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = postingFlagReducer(true, requestAction);

    expect(tested).toEqual(true);
  });
});
