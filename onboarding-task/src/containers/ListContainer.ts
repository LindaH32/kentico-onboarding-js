import * as React from 'react';
import { connect } from 'react-redux';
import { List } from '../components/List';
import { addItem, fetchItems } from '../actionCreators/actionCreators';
import { IAppState } from '../reducers/IAppState';
import { IListDataProps, IListCallbackProps } from '../components/List';

interface IListContainerProps {}

const mapStateToProps = (state: IAppState): IListDataProps => ({
  itemIds: state.itemIds,
  isFetching: state.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch): IListCallbackProps => ({
  onAddItem: (text: string) => dispatch(addItem(text)),
  fetchItems: () => dispatch(fetchItems()),
});

const ListContainer: React.ComponentClass<IListContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer as List };
