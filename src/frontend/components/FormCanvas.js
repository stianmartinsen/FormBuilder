import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

import CSSModules from 'react-css-modules';
import styles from '../css/formCanvas.css';

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
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    return connectDropTarget(
      <div styleName="canvas">
        {isActive ?
          'Release to drop' :
          'Drag a box here'
        }
        {this.props.fields.map((Field, i) => {
          return <Field key={i} />
        })}
      </div>
    );
  }
}
export default connect()(FormCanvas);