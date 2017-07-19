import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../reducers/IAppState';
import { ListItem as ListItemComponent} from '../components/ListItem';
import {
  enableEditItem,
  deleteItem,
  cancelChangesToItem,
  putItem,
} from '../actionCreators/actionCreators';
import { itemViewModel } from '../models/itemViewModel';
import { IListItemDataProps, IListItemCallbackProps } from '../components/ListItem';

interface IListItemContainerProps {
  itemId: string;
  index: number;
}

const mapStateToProps = (state: IAppState, ownProps: IListItemContainerProps): IListItemDataProps => {
  const id = ownProps.itemId;
  const itemById = state.list.items.get(id);
  const indexedItem = itemViewModel(itemById, ownProps.index);

  return {item: indexedItem};
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IListItemContainerProps): IListItemCallbackProps => ({
  onDelete: () => deleteItem(ownProps.itemId)(dispatch),
  onDoubleClick: () => dispatch(enableEditItem(ownProps.itemId)),
  onSave: (text: string) => putItem(ownProps.itemId, text)(dispatch),
  onCancel: () => dispatch(cancelChangesToItem(ownProps.itemId)),
});

const ListItem: React.ComponentClass<IListItemContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItemComponent);

export { ListItem };
