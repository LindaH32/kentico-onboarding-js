import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../reducers/IAppState';
import { ListItem } from '../components/ListItem';
import {
  enableEditItem,
  deleteItem,
  cancelChangesToItem,
  updateItem,
} from '../actionCreators/actionCreators';
import { itemViewModel } from '../models/itemViewModel';
import { IListItemDataProps, IListItemCallbackProps } from '../components/ListItem';

interface IListItemContainerProps {
  itemId: string;
  index: number;
}

const mapStateToProps = (state: IAppState, ownProps: IListItemContainerProps): IListItemDataProps => {
  const id = ownProps.itemId;
  const itemById = state.items.get(id);
  const indexedItem = itemViewModel(itemById, ownProps.index);

  return { item: indexedItem };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IListItemContainerProps): IListItemCallbackProps => ({
  onDelete: () => deleteItem(ownProps.itemId)(dispatch),
  onDoubleClick: () => dispatch(enableEditItem(ownProps.itemId)),
  onSave: (text: string) => updateItem(ownProps.itemId, text)(dispatch),
  onCancel: () => dispatch(cancelChangesToItem(ownProps.itemId)),
});

const ListItemContainer: React.ComponentClass<IListItemContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItem);

export { ListItemContainer as ListItem };
