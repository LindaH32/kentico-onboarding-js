import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../reducers/IAppState';
import { IListOrSpinnerCallbackProps, IListOrSpinnerDataProps } from '../components/ListOrSpinner';
import { ListOrSpinner as ListOrSpinnerComponent } from '../components/ListOrSpinner';
import { fetchItems } from '../actionCreators/actionCreators';

const mapStateToProps = (state: IAppState, _ownProps: IListOrSpinnerDataProps): IListOrSpinnerDataProps => ({
  isFetching: state.list.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch): IListOrSpinnerCallbackProps => ({
  fetchItems: () => fetchItems(dispatch)
});

const ListOrSpinner: React.ComponentClass<IListOrSpinnerDataProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOrSpinnerComponent);

export { ListOrSpinner };
