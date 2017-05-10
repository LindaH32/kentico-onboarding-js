import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import * as PropTypes from 'prop-types';
import { OrderedSet } from 'immutable';
import { AddItem } from './AddItem';
import { ListItem } from '../containers/ListItemContainer';
import { IAction } from '../actionCreators/IAction';

export interface IListDataProps {
  itemIds: OrderedSet<string>;
  isFetching: boolean;
}

export interface IListCallbackProps {
  onAddItem: (text: string) => IAction;
  fetchItems: () => (dispatch: Dispatch) => Promise<IAction>;
}

const List: React.StatelessComponent<IListDataProps & IListCallbackProps> = ({
    itemIds,
    onAddItem,
    fetchItems,
    isFetching,
  }) => {
  const renderedRows = itemIds.valueSeq().map((itemId: string, index: number) => (
    <li key={itemId} className="list-group-item">
      <ListItem itemId={itemId} index={index + 1} />
    </li>
  ));

  const logJsonOut = () => {
    fetchItems();
    console.log('List.tsx ');
  };

  const spinner = <img src={require('../../assets/running_spinner.gif')} />;
  const rowsOrSpinner = !isFetching ? renderedRows : spinner;

  return (
    <div className="row">
      <div className="row">
        <div className="col-sm-12">
          <button className="btn btn-lg btn-info" onClick={logJsonOut}>Click ME</button>
          <p className="lead text-center">
            <b>Note: </b>
            Try to make the solution easily extensible (e.g. more displayed fields per item).
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ul id="todo-list" className="list-group">
            {rowsOrSpinner}
            <li className="list-group-item">
              <AddItem isFetching={isFetching} onAdd={onAddItem} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

List.displayName = 'List';
List.propTypes = {
  itemIds: ImmutablePropTypes.orderedSet.isRequired,
  onAddItem: PropTypes.func.isRequired,
  fetchItems: PropTypes.any.isRequired,
};

export { List };
