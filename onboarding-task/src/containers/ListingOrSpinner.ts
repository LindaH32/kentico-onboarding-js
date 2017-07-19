import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../reducers/IAppState';
import { IListOrSpinnerCallbackProps, IListOrSpinnerDataProps } from '../components/ListingOrSpinner';
import { ListOrSpinner as ListingOrSpinnerComponent } from '../components/ListingOrSpinner';
import { fetchItems } from '../actionCreators/actionCreators';

const mapStateToProps = (state: IAppState, _ownProps: IListOrSpinnerDataProps): IListOrSpinnerDataProps => ({
  isFetching: state.list.isFetching,
  wrappedComponent: _ownProps.wrappedComponent,
});

const mapDispatchToProps = (dispatch: Dispatch): IListOrSpinnerCallbackProps => ({
  fetchItems: () => fetchItems(dispatch),
});

const ListOrSpinner: React.ComponentClass<IListOrSpinnerDataProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingOrSpinnerComponent);

export { ListOrSpinner };
