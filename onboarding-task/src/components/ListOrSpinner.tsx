import * as React from 'react';
import * as PropTypes from 'prop-types';
import { List } from '../containers/List';
import { IAction } from '../actionCreators/IAction';

export interface IListOrSpinnerDataProps {
  isFetching: boolean;
}

export interface  IListOrSpinnerCallbackProps {
  fetchItems: () => Promise<IAction>;
}

type ListOrSpinnerProps = IListOrSpinnerDataProps & IListOrSpinnerCallbackProps;

class ListOrSpinner extends React.PureComponent<ListOrSpinnerProps>{
  static displayName = 'ListOrSpinner';
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    fetchItems: PropTypes.func.isRequired,
  };

  constructor(props: ListOrSpinnerProps) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchItems();
  }

  render() {
    return this.props.isFetching ?
      <img src={require('../../assets/running_spinner.gif')} /> : <List/>;
  }
}

export { ListOrSpinner };
