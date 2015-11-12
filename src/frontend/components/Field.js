import React, { Component, PropTypes } from 'react';

export default class Field extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(['text', 'number']),
    label: React.PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    const { isDragging, connectDragSource } = this.props;
    const { name } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    return connectDragSource(
      <div>
        <label>{this.props.label ? this.props.label : 'Field'}</label>
        <input type={this.props.type ? this.props.type : 'text'} readonly />
      </div>
    );
  }
}
