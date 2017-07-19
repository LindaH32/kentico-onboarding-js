import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../reducers/IAppState';
import { ILoaderCallbackProps, ILoaderDataProps } from '../components/Loader';
import { Loader as LoaderComponent } from '../components/Loader';
import { fetchItems } from '../actionCreators/actionCreators';
import { List } from './List';

const mapStateToProps = (state: IAppState, _ownProps: ILoaderDataProps): ILoaderDataProps => ({
  isFetching: state.list.isFetching,
  wrappedComponent: React.createElement(List),
});

const mapDispatchToProps = (dispatch: Dispatch): ILoaderCallbackProps => ({
  fetchItems: () => fetchItems(dispatch),
});

const ListWithLoader: React.ComponentClass<ILoaderDataProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoaderComponent);

export { ListWithLoader };
