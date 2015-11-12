import React, { PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import Field from './Field';
import FieldList from './FieldList';
import FieldType from './FieldType';
import FormCanvas from './FormCanvas';
import HTML5Backend from 'react-dnd-html5-backend';

import CSSModules from 'react-css-modules';
import styles from './test.css';

@CSSModules(styles)
@DragDropContext(HTML5Backend)
class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <FieldList>
          <FieldType name="Text" fieldComponent={Field}></FieldType>
        </FieldList>
        <FormCanvas fields={this.props.fields}></FormCanvas>
      </div>
    );
  }
}

export default connect(state => ({fields: state.canvas}))(Application);
