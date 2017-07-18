import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import * as PropTypes from 'prop-types';
import { OrderedSet } from 'immutable';
import { AddItem } from './AddItem';
import { IAction } from '../actionCreators/IAction';
import { ListItem } from '../containers/ListItem';
import { DisplayError } from '../containers/DisplayError';

export interface IListDataProps {
  itemIds: OrderedSet<string>;
  errorIds: OrderedSet<string>;
}

export interface IListCallbackProps {
  onAddItem: (text: string) => Promise<IAction>;
}

const List: React.StatelessComponent<IListDataProps & IListCallbackProps> = ({
  itemIds,
  errorIds,
  onAddItem,
}) => {
  this._prepareRows = () => (
      itemIds.valueSeq().map((itemId: string, index: number) => (
      <li key={itemId} className="list-group-item">
        <ListItem itemId={itemId} index={index + 1} />
      </li>
  )));

  this._prepareList = () => (
    <ul id="todo-list" className="list-group">
      {this._prepareRows()}
      <li className="list-group-item">
        <AddItem onAdd={onAddItem} />
      </li>
    </ul>
  );

  this._prepareErrors = () => (
    errorIds.valueSeq().map((errorId: string) => (
        <DisplayError key={errorId} errorId={errorId}/>
    )));

  return (
    <div className="row">
      {this._prepareErrors()}
      <div className="row">
        <div className=" col-sm-12 col-md-offset-2 col-md-8">
          {this._prepareList()}
        </div>
      </div>
    </div>
  );
};

List.displayName = 'List';
List.propTypes = {
  itemIds: ImmutablePropTypes.orderedSet.isRequired,
  onAddItem: PropTypes.func.isRequired,
  errorIds: ImmutablePropTypes.orderedSet.isRequired,
};

export { List };
