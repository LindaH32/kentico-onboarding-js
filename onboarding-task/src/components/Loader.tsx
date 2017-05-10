import * as React from 'react';;
import * as PropTypes from 'prop-types';

interface ILoaderDataProps {
  isFetching: boolean;
}

const Loader: React.StatelessComponent<ILoaderDataProps> = ({
    isFetching,
  }) => {
  if (isFetching) {
    return <img src={require('../../assets/running_spinner.gif')} />;
  }
  return <span></span>;
};

Loader.displayName = 'Loader';
Loader.propTypes = {
  isFetching: PropTypes.bool.isRequired,
};

export { Loader };
