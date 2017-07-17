import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../reducers/IAppState';
import { ILoaderDataProps } from '../components/Loader';
import { Loader as LoaderComponent } from '../components/Loader';

const mapStateToProps = (state: IAppState, _ownProps: ILoaderDataProps): ILoaderDataProps => ({
  isFetching: state.isFetching,
});

const Loader: React.ComponentClass<ILoaderDataProps> = connect(
  mapStateToProps,
)(LoaderComponent);

export { Loader };
