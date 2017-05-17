import * as React from 'react';
import * as PropTypes from 'prop-types';

interface IFetchErrorProps {
  errorMessage: any;
}

const FetchError: React.StatelessComponent<IFetchErrorProps> = (errorMessage) => (
  <div className="alert alert-danger">
    <p>Something went wrong: {errorMessage}</p>
  </div>
);

FetchError.displayName = 'FetchError';
FetchError.propTypes = {
  errorMessage: PropTypes.any.isRequired,
};

export { FetchError };
