import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IAction } from '../actionCreators/IAction';

interface IAddItemCallbackProps {
  onAdd: (text: string) => Promise<IAction>;
}

interface IAddItemState {
  text: string;
}

class AddItem extends React.PureComponent<IAddItemCallbackProps, IAddItemState> {
  static displayName = 'AddItem';

  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

  constructor(props: IAddItemCallbackProps) {
    super(props);
    this.state = { text: '' };
  }

  _handleChange = (event: React.FormEvent<HTMLInputElement>) =>
    this.setState({ text: event.currentTarget.value });

  _handleClickAdd = () => {
    this.props.onAdd(this.state.text);
    this.setState({ text: '' });
  };

  _handleNonEmptyInsert = (text: string) => (text.trim() === '');

  render() {
    return (
      <div className="form-inline">
        <input className="form-control" onChange={this._handleChange} value={this.state.text} />
        <button disabled={ this._handleNonEmptyInsert(this.state.text) }  type="button" className="btn btn-default" onClick={this._handleClickAdd}>Add</button>
      </div>
    );
  }
}

export { AddItem };
