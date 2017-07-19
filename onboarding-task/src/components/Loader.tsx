import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IAction } from '../actionCreators/IAction';

export interface ILoaderDataProps {
  isFetching: boolean;
  wrappedComponent: any;
}

export interface  ILoaderCallbackProps {
  fetchItems: () => Promise<IAction>;
}

type LoaderProps = ILoaderDataProps & ILoaderCallbackProps;

class Loader extends React.PureComponent<LoaderProps> {
  static displayName = 'Loader';
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    wrappedComponent: PropTypes.element.isRequired,
    fetchItems: PropTypes.func.isRequired,
  };

  constructor(props: LoaderProps) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchItems();
  }

  render() {
    return this.props.isFetching ?
      <img src={require('../../assets/running_spinner.gif')} /> : this.props.wrappedComponent;
  }
}

export { Loader };
