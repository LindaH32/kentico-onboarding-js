import { connect } from 'react-redux';

import { List } from '../components/List';
import { createListItem } from '../actionCreators/actionCreators';

const mapStateToProps = (state) => {
  return {
    itemsOrder: state.items.orderedIds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onListItemAdd: (text) => dispatch(createListItem(text)),
  };
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

export { ListContainer };
