import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';

const dragSpec = {
  beginDrag(props) {
    return {
      name: props.name
    };
  }
};

@DragSource('field', dragSpec, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class FieldType extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    fieldComponent: React.PropTypes.func
  }

  render() {
    const { isDragging, connectDragSource } = this.props;
    const { name } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(
      <div>
        {this.props.name}
      </div>
    )
  }
}