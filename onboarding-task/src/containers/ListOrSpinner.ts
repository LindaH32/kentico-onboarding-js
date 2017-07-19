import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../reducers/IAppState';
import { ILoaderCallbackProps, ILoaderDataProps } from '../components/ListOrSpinner';
import { Loader as ListOrSpinner } from '../components/ListOrSpinner';
import { fetchItems } from '../actionCreators/actionCreators';

const mapStateToProps = (state: IAppState, _ownProps: ILoaderDataProps): ILoaderDataProps => ({
  isFetching: state.list.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch): ILoaderCallbackProps => ({
  fetchItems: () => fetchItems(dispatch)
});

const Loader: React.ComponentClass<ILoaderDataProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOrSpinner);

export { Loader };
