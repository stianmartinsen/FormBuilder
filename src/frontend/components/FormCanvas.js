import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

import {moveFields} from '../actions';

import CSSModules from 'react-css-modules';
import styles from '../css/formCanvas.css';

const fieldWrapSource = {
  beginDrag(props) {
    return {
      index: props.index
    };
  }
};

const fieldWrapTarget = {
  hover(props, monitor, component) {
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

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    if (dragIndex && hoverIndex) {
      props.dispatch(moveFields(dragIndex, hoverIndex));
    }

    monitor.getItem().index = hoverIndex;
  }
};
@DragSource('field', fieldWrapSource, (connect) => ({
  connectDragSource: connect.dragSource()
}))
@DropTarget('field', fieldWrapTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
class FieldWrap extends Component {
  render () {
    const {connectDragSource, connectDropTarget, id, onMove, ...props} = this.props;
    return connectDragSource(connectDropTarget(<div>{this.props.children}</div>));
  }
}
FieldWrap = connect()(FieldWrap);

const targetSpec = {
  drop(props, monitor, component) {
    return {
      name: 'FormCanvas'
    };
  }
};

@DropTarget('field', targetSpec, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
@CSSModules(styles)
export default class FormCanvas extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    fields: PropTypes.array
  }

  render() {
    const { canDrop, isOver, connectDropTarget, onMoveField } = this.props;
    const isActive = canDrop && isOver;

    return connectDropTarget(
      <div styleName="canvas">
        {isActive ?
          'Release to drop' :
          'Drag a box here'
        }
        {this.props.fields.map((field, i) => {
          const Field = field.fieldComponent;
          return <FieldWrap index={i} key={i}><Field/>{field.priority}</FieldWrap>
        })}
      </div>
    );
  }
}

export default connect()(FormCanvas);
