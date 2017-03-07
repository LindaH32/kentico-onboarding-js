import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class ListItemStatic extends Component {
  static displayName = 'ListItemStatic';
  static propTypes = {
    item: ImmutablePropTypes.recordOf({
      guid: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
    }),
    onToggleEditMode: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    this.props.onToggleEditMode(this.props.item.guid);
  }

  render() {
    return (
      <tr>
        <td>
          <div onClick={this._onClick}>{this.props.item.text}</div>
        </td>
      </tr>
    );
  }
}

export { ListItemStatic };
