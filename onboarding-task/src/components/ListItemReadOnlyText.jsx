import React from 'react';

class ListItemReadOnlyText extends React.Component {
  render() {
    return (
      <div className="form-group">
        <span>{this.props.item.text}</span>
      </div>
    );
  }
}

export default ListItemReadOnlyText;
