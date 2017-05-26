import * as React from 'react';
import * as PropTypes from 'prop-types';

interface IFetchErrorProps {
  errorMessage: string;
}

const FetchError: React.StatelessComponent<IFetchErrorProps> = ({ errorMessage }) => errorMessage ? (
  <div className="alert alert-danger">
    <strong>Something went wrong:</strong> {errorMessage}
  </div>
) : <span/>;

FetchError.displayName = 'FetchError';
FetchError.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export { FetchError };
