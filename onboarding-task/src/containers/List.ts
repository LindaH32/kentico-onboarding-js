import * as React from 'react';
import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';
import { postItem } from '../actionCreators/actionCreators';
import { IAppState } from '../reducers/IAppState';
import { IListDataProps, IListCallbackProps } from '../components/List';

interface IListContainerProps {}

const mapStateToProps = (state: IAppState): IListDataProps => ({
  itemIds: state.itemIds,
  errorIds: state.errorIds,
});

const mapDispatchToProps = (dispatch: Dispatch): IListCallbackProps => ({
  onAddItem: (text: string) => postItem(text)(dispatch),
});

const List: React.ComponentClass<IListContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListComponent);

export { List };
