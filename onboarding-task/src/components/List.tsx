import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import * as PropTypes from 'prop-types';
import { OrderedSet } from 'immutable';
import { AddItem } from './AddItem';
import { IAction } from '../actionCreators/IAction';
import { Loader } from './Loader';
import { ListItem } from '../containers/ListItem';
import { DisplayError } from '../containers/DisplayError';

export interface IListDataProps {
  itemIds: OrderedSet<string>;
  isFetching: boolean;
  errorIds: OrderedSet<string>;
}

export interface IListCallbackProps {
  onAddItem: (text: string) => Promise<IAction>;
  fetchItems: () => Promise<IAction>;
}

type ListProps = IListDataProps & IListCallbackProps;

interface  IListState {}

class List extends React.PureComponent<ListProps, IListState> {
  static displayName = 'List';

  static propTypes = {
  itemIds: ImmutablePropTypes.orderedSet.isRequired,
  onAddItem: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorIds: ImmutablePropTypes.orderedSet.isRequired,
  };

  constructor(props: ListProps) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchItems();
  }

  _prepareRows = () => (
      this.props.itemIds.valueSeq().map((itemId: string, index: number) => (
      <li key={itemId} className="list-group-item">
        <ListItem itemId={itemId} index={index + 1} />
      </li>
  )));

  _prepareList = () => (
    <ul id="todo-list" className="list-group">
      {this._prepareRows()}
      <li className="list-group-item">
        <AddItem onAdd={this.props.onAddItem} />
      </li>
    </ul>
  );

  _prepareErrors = () => (
    this.props.errorIds.valueSeq().map((errorId: string) => (
        <DisplayError key={errorId} errorId={errorId}/>
    )));

  _listIfIsfNotLoading = () =>
    !this.props.isFetching ? this._prepareList() : null;

  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12">
            <p className="lead text-center">
              <b>Note: </b>
              Try to make the solution easily extensible (e.g. more displayed fields per item).
            </p>
          </div>
        </div>
          {this._prepareErrors()}
        <div className="row">
          <div className=" col-sm-12 col-md-offset-2 col-md-8">
            <Loader isFetching={this.props.isFetching} />
            {this._listIfIsfNotLoading()}
          </div>
        </div>
      </div>
    );
  }
}

export { List };
