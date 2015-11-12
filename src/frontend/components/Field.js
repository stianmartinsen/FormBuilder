import React, { Component, PropTypes } from 'react';

class Field extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['text', 'number']),
    label: PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label>{this.props.label ? this.props.label : 'Field'}</label>
        <input type={this.props.type ? this.props.type : 'text'} readonly />
      </div>
    );
  }
}

export default Field
