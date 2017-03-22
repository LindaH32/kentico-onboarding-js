import React, { PureComponent, PropTypes } from 'react';

class LineRead extends PureComponent {
  static displayName = 'LineRead';

  static propTypes = {
    line: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
  };

  _handleDoubleClick = () => {
    this.props.onDoubleClick(this.props.line.id);
  };

  render() {
    return (
      <div onDoubleClick={this._handleDoubleClick} >
        <span>{this.props.number}. </span>
        {this.props.line.text}
      </div>
    );
  }
}

export { LineRead };
