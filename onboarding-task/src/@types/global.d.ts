// Type definitions for [~dispatch, IRecordFunctions~]
// Project: [~onboarding-task~]
// Definitions by: [~LindaH~] <[~https://github.com/LindaH32~]>

import { IAction } from '../actionCreators/IAction';

declare global {
  type DispatchAction = (action: IAction ) => IAction;
  type DispatchThunk = (thunkAction: (dispatch: DispatchAction) => Promise<IAction>) => Promise<IAction>;
  type Dispatch = DispatchAction & DispatchThunk;

  interface IRecordFunctions<TRecordData, TRecordFunctions> {
    // We can return the data of a record
    toObject: () => TRecordData;
    // We can merge the record data with other record data
    with: (data: Partial<TRecordData>) => TRecordFunctions & TRecordData;
  }
}
