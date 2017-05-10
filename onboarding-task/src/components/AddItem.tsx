import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IAction } from '../actionCreators/IAction';

interface IAddItemCallbackProps {
  onAdd: (text: string) => IAction;
}

interface IAddItemDataProps {
  isFetching: boolean;
}

interface IAddItemState {
  text: string;
}

type AddItemProps = IAddItemCallbackProps & IAddItemDataProps;

class AddItem extends React.PureComponent<AddItemProps, IAddItemState> {
  static displayName = 'AddItem';

  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    isFetching: PropTypes.func.isRequired,
  };

  constructor(props: AddItemProps) {
    super(props);
    this.state = { text: '' };
  }

  _handleChange = (event: React.FormEvent<HTMLInputElement>) =>
    this.setState({ text: event.currentTarget.value });

  _handleClickAdd = () => {
    this.props.onAdd(this.state.text);
    this.setState({ text: '' });
  };

  render() {
    return (
      <div className="form-inline">
        <input disabled={this.props.isFetching}  className="form-control" onChange={this._handleChange} value={this.state.text} />
        <button disabled={this.props.isFetching}  type="button" className="btn btn-default" onClick={this._handleClickAdd}>Add</button>
      </div>
    );
  }
}

export { AddItem };
