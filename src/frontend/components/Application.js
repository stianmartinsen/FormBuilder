import React, { PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import FieldList from './FieldList';
import FieldType from './FieldType';
import FormCanvas from './FormCanvas';
import HTML5Backend from 'react-dnd-html5-backend';

import Field from './fields/Field';
import EmailField from './fields/EmailField';

import CSSModules from 'react-css-modules';
import styles from '../css/base.css';

@DragDropContext(HTML5Backend)
@CSSModules(styles)
class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div styleName="wrapper">
        <div styleName="list">
          <FieldList>
            <FieldType name="Text field" fieldComponent={Field}></FieldType>
            <FieldType name="E-mail" fieldComponent={EmailField}></FieldType>
          </FieldList>
        </div>

        <div styleName="canvas">
          <FormCanvas moveField={this.moveField} fields={this.props.fields} onMoveField={this.moveField}></FormCanvas>
        </div>
      </div>
    );
  }
}

export default connect(state => ({fields: state.canvas}))(Application);
