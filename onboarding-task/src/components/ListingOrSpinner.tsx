import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IAction } from '../actionCreators/IAction';

export interface IListingOrSpinnerDataProps {
  isFetching: boolean;
  wrappedComponent: any;
}

export interface  IListingOrSpinnerCallbackProps {
  fetchItems: () => Promise<IAction>;
}

type ListingOrSpinnerProps = IListingOrSpinnerDataProps & IListingOrSpinnerCallbackProps;

class ListingOrSpinner extends React.PureComponent<ListingOrSpinnerProps> {
  static displayName = 'ListingOrSpinner';
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    wrappedComponent: PropTypes.element.isRequired,
    fetchItems: PropTypes.func.isRequired,
  };

  constructor(props: ListingOrSpinnerProps) {
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

export { ListingOrSpinner };
