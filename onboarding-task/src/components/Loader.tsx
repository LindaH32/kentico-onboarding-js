import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IAction } from '../actionCreators/IAction';

export interface ILoaderDataProps {
  isFetching: boolean;
  wrappedComponent: any;
  spinner: string;
}

export interface  ILoaderCallbackProps {
  doAfterMounting: () => Promise<IAction>;
}

type LoaderProps = ILoaderDataProps & ILoaderCallbackProps;

class Loader extends React.PureComponent<LoaderProps> {
  static displayName = 'Loader';
  static propTypes = {
    spinner: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    wrappedComponent: PropTypes.element.isRequired,
    doAfterMounting: PropTypes.func.isRequired,
  };

  constructor(props: LoaderProps) {
    super(props);
  }

  componentDidMount() {
    this.props.doAfterMounting();
  }

  render() {
    return this.props.isFetching
        ? <img src={this.props.spinner} />
        : this.props.wrappedComponent;
  }
}

export { Loader };
