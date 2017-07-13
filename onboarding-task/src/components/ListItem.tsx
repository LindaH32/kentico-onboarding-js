import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ItemEdit } from './ItemEdit';
import { ItemRead } from './ItemRead';
import { IItemViewModel } from '../models/IItemViewModel';
import { IAction } from '../actionCreators/IAction';

export interface IListItemDataProps {
  item: IItemViewModel;
}

export interface IListItemCallbackProps {
  onSave: (text: string) => IAction;
  onCancel: () => IAction;
  onDelete: () => Promise<IAction>;
  onDoubleClick: () => IAction;
}

const ListItem: React.StatelessComponent<IListItemDataProps & IListItemCallbackProps> = ({
    item,
    onSave,
    onCancel,
    onDelete,
    onDoubleClick,
}) => {
  if (item.isEdited) {
    return (
      <ItemEdit
        key={item.id}
        item={item}
        onSave={onSave}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    );
  }
  return (
    <ItemRead
      key={item.id}
      item={item}
      onDoubleClick={onDoubleClick}
    />
  );
};

ListItem.displayName = 'ListItem';
ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isEdited: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

export { ListItem };
