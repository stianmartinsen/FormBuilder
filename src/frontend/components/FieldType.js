import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import { addField } from '../actions';

const dragSpec = {
  beginDrag(props) {
    return {
      name: props.name
    };
  },

  endDrag(props, monitor) {
    props.dispatch(addField(props.fieldComponent));
  }
};

@DragSource('field', dragSpec, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
class FieldType extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    fieldComponent: PropTypes.element
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

export default connect()(FieldType);
