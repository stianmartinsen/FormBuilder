import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import { addField } from '../actions';

import CSSModules from 'react-css-modules';
import styles from '../css/fieldType.css';

const dragSpec = {
  beginDrag(props) {
    return {
      name: props.name
    };
  },

  endDrag(props, monitor) {
    const dropResult = monitor.getDropResult();
    if (dropResult && dropResult.name === 'FormCanvas') {
      props.dispatch(addField(props.fieldComponent));
    }
  }
};

@DragSource('field', dragSpec, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
}))
@CSSModules(styles)
class FieldType extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    fieldComponent: PropTypes.element
  }

  render() {
    const { connectDragSource } = this.props;
    const { name } = this.props;

    return connectDragSource(
      <div styleName="field">
        {this.props.name}
      </div>
    )
  }
}

export default connect()(FieldType);
