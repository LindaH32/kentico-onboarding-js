import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import * as PropTypes from 'prop-types';
import { OrderedSet } from 'immutable';
import { AddItem } from './AddItem';
import { ListItem } from '../containers/ListItemContainer';
import { IAction } from '../actionCreators/IAction';

export interface IListDataProps {
  itemIds: OrderedSet<string>;
}

export interface IListCallbackProps {
  onAddItem: (text: string) => IAction;
  fetchItems: () => (dispatch: Dispatch) => Promise<IAction>;
}

const List: React.StatelessComponent<IListDataProps & IListCallbackProps> = ({
    itemIds,
    onAddItem,
  }) => {
  const renderedRows = itemIds.valueSeq().map((itemId: string, index: number) => (
    <li key={itemId} className="list-group-item">
      <ListItem itemId={itemId} index={index + 1} />
    </li>
  ));

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

      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ul id="todo-list" className="list-group">
            {renderedRows}
            <li className="list-group-item">
              <AddItem onAdd={onAddItem} />
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
};

export { List };
