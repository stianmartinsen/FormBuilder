import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

import Sortable from './Sortable';
import { moveFields } from '../actions';

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
@CSSModules(styles, {allowMultiple: true})
export default class FormCanvas extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    fields: PropTypes.array
  }

  onSort(dragIndex, hoverIndex) {
    this.props.dispatch(moveFields(dragIndex, hoverIndex));
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
          return <Sortable index={i} key={field.id} onSort={this.onSort.bind(this)} type="field"><Field id={field.id} /></Sortable>
        })}

        <div styleName={'empty ' + (this.props.fields.length ? 'hidden' : '')}>Add fields from the list</div>
      </div>
    );
  }
}

export default connect()(FormCanvas);
