import React, { Component, PropTypes } from 'react';
import Field from './Field';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';

const boxTarget = {
  drop() {
    return { name: 'FormCanvas' };
  }
};

@DropTarget('field', {}, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
export default class TextField extends Field {
  render() {
    return super.render(
      <div>
        <label>{this.props.label ? this.props.label : 'Field'}</label>
        <input type={this.props.type ? this.props.type : 'text'} readonly />
      </div>
    )
  }
}