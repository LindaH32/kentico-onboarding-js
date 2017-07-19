import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../reducers/IAppState';
import { IListingOrSpinnerCallbackProps, IListingOrSpinnerDataProps } from '../components/Loader';
import { ListingOrSpinner as ListingOrSpinnerComponent } from '../components/Loader';
import { fetchItems } from '../actionCreators/actionCreators';

const mapStateToProps = (state: IAppState, _ownProps: IListingOrSpinnerDataProps): IListingOrSpinnerDataProps => ({
  isFetching: state.list.isFetching,
  wrappedComponent: _ownProps.wrappedComponent,
});

const mapDispatchToProps = (dispatch: Dispatch): IListingOrSpinnerCallbackProps => ({
  fetchItems: () => fetchItems(dispatch),
});

const ListingOrSpinner: React.ComponentClass<IListingOrSpinnerDataProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingOrSpinnerComponent);

export { ListingOrSpinner };
