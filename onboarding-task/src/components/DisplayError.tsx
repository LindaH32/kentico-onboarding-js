import * as React from 'react';
import * as PropTypes from 'prop-types';

interface IDisplayErrorProps {
  errorMessage: string;
}

const DisplayError: React.StatelessComponent<IDisplayErrorProps> = ({ errorMessage }) => !errorMessage ? (
  <div className="alert alert-danger">
    <strong>Something went wrong:</strong> {errorMessage}
    <button  type="button" className="btn btn-default btn-xs glyphicon glyphicon-remove" />
  </div>
) : <span/>;

DisplayError.displayName = 'DisplayError';
DisplayError.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export { DisplayError };
