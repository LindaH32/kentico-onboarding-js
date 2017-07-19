import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../reducers/IAppState';
import { DisplayError } from '../components/DisplayError';
import { dismissError } from '../actionCreators/actionCreators';
import { IDisplayErrorDataProps, IDisplayErrorCallbackProps } from '../components/DisplayError';

interface IDisplayErrorContainerProps {
  errorId: string;
}

const mapStateToProps = (state: IAppState, ownProps: IDisplayErrorContainerProps): IDisplayErrorDataProps => {
  const id = ownProps.errorId;
  const errorById = state.list.errors.get(id);

  return { error: errorById };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IDisplayErrorContainerProps): IDisplayErrorCallbackProps => ({
  onDismissClick: () => dispatch(dismissError(ownProps.errorId)),
});

const DisplayErrorContainer: React.ComponentClass<IDisplayErrorContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisplayError);

export { DisplayErrorContainer as DisplayError };
