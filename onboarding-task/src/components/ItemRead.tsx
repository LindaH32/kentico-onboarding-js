import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IItemViewModel } from '../models/IItemViewModel';
import { IAction } from '../actionCreators/IAction';

interface IItemReadDataProps {
  item: IItemViewModel;
}

interface IItemReadCallbackProps {
  onDoubleClick: () => IAction;
}

const ItemRead: React.StatelessComponent<IItemReadDataProps & IItemReadCallbackProps> = ({
  onDoubleClick,
  item,
}) => (
  <div onDoubleClick={onDoubleClick} >
    <span>{item.index}. </span>
    {item.text}
  </div>
  );

ItemRead.displayName = 'ItemRead';
ItemRead.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isEdited: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

export { ItemRead };
