import React = require('react');

import { IAction } from '../interfaces/IAction';

interface IListItemFormProps {
  index: number;
  inputValue: string;
  onFormSubmit: (input: string) => IAction;
  onFormCancelClick: () => IAction;
  onFormDeleteClick: () => IAction;
}

interface IListItemFormState {
  input: string;
}

class ListItemForm extends React.PureComponent<IListItemFormProps, IListItemFormState> {

  static displayName = 'ListItemForm';

  constructor(props: IListItemFormProps) {
    super(props);

    this.state = {
      input: props.inputValue,
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onChange(event: any) {
    this.setState({ input: event.target.value });
  }

  _onSubmit(event: any) {
    event.preventDefault();
    this.props.onFormSubmit(this.state.input);
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this._onSubmit}>
        {this.props.index}. <input
          type="text"
          className="form-control"
          value={this.state.input}
          onChange={this._onChange}
        />
        <button type="submit" className="btn btn-primary"> Change</button>
        <button type="button" className="btn btn-default" onClick={this.props.onFormCancelClick}> Cancel</button>
        <button type="button" className="btn btn-danger" onClick={this.props.onFormDeleteClick}> Delete</button>
      </form>
    );
  }
}

export { ListItemForm };
