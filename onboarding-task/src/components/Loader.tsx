import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import * as PropTypes from 'prop-types';
import { OrderedSet } from 'immutable';
import { ListItem } from '../containers/ListItemContainer';

interface ILoaderDataProps {
  itemIds: OrderedSet<string>;
  isFetching: boolean;
}

const Loader: React.StatelessComponent<ILoaderDataProps> = ({
    itemIds,
    isFetching,
  }) => {
  const renderedRows = itemIds.valueSeq().map((itemId: string, index: number) => (
    <li key={itemId} className="list-group-item">
      <ListItem itemId={itemId} index={index + 1} />
    </li>
  ));

  const spinner = <img src={require('../../assets/running_spinner.gif')} />;
  const rowsOrSpinner = !isFetching ? renderedRows : spinner;

  return <span>{rowsOrSpinner}</span>;
};

Loader.displayName = 'Loader';
Loader.propTypes = {
  itemIds: ImmutablePropTypes.orderedSet.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export { Loader };
