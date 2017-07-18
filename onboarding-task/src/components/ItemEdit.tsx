import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IItemViewModel } from '../models/IItemViewModel';
import { IAction } from '../actionCreators/IAction';
import { isInsertEmpty } from '../utils/isInsertEmpty';

interface IItemEditDataProps {
  item: IItemViewModel;
}

interface IItemEditCallbackProps {
  onSave: (text: string) => IAction;
  onCancel: () => IAction;
  onDelete: () => IAction;
}

type ItemProps = IItemEditDataProps & IItemEditCallbackProps;

interface IItemEditState {
  text: string;
}

class ItemEdit extends React.PureComponent<ItemProps, IItemEditState> {
  static displayName = 'ItemEdit';

  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isEdited: PropTypes.bool.isRequired,
      index: PropTypes.number.isRequired,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  constructor(props: ItemProps) {
    super(props);
    this.state = {
      text: this.props.item.text,
    };
  }

  _handleOnChange = (event: React.FormEvent<HTMLInputElement>) =>
    this.setState({ text: event.currentTarget.value });

  _handleOnSave = () =>
    this.props.onSave(this.state.text);

  render() {
    return (
      <div>
        <span className="form-inline">{this.props.item.index}.
          <input autoFocus className="form-control" value={this.state.text} onChange={this._handleOnChange} />
          <span>
            <button disabled={isInsertEmpty(this.state.text)} type="button" className="btn btn-primary" onClick={this._handleOnSave}>Save</button>
            <button type="button" className="btn btn-default" onClick={this.props.onCancel}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={this.props.onDelete}>Delete</button>
          </span>
        </span>
      </div>
    );
  }
}

export { ItemEdit };
