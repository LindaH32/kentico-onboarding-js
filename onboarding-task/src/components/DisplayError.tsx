import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IAction } from '../actionCreators/IAction';

export interface IDisplayErrorDataProps {
  error: string;
}

export interface IDisplayErrorCallbackProps {
  onDismissClick: () => IAction;
}

const DisplayError: React.StatelessComponent<IDisplayErrorDataProps & IDisplayErrorCallbackProps> = ({
     error,
     onDismissClick,
  }) => (
  <div className="alert alert-danger">
    <strong>Something went wrong:</strong> {error}
    <button onClick={onDismissClick} type="button" className="btn btn-default btn-xs glyphicon glyphicon-remove" />
  </div>
);

DisplayError.displayName = 'DisplayError';
DisplayError.propTypes = {
  error: PropTypes.string.isRequired,
};
DisplayError.displayName = 'DisplayError';
DisplayError.propTypes = {
  error: PropTypes.string.isRequired,
  onDismissClick: PropTypes.func.isRequired,
};

export { DisplayError };
