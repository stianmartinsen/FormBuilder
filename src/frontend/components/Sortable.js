import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

const sortableSource = {
  beginDrag(props) {
    return {
      index: props.index
    };
  }
};

const sorableTarget = {
  hover(props, monitor, component) {
    if (monitor.getItem().type === 'fieldType') {
      return;
    }

    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.onSort(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  }
};

@DragSource((props) => props.type, sortableSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@DropTarget((props) => props.type, sorableTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Sortable extends Component {
  render() {
    const {connectDragSource, connectDropTarget, isDragging, ...props} = this.props;

    return connectDragSource(connectDropTarget(
      <div style={{opacity: isDragging ? 0 : 1}}>{this.props.children}</div>
    ));
  }
}
