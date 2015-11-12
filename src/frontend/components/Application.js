import React, { PropTypes } from 'react';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import { fetchShouts } from '../actions';
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

  componentWillMount() {
    this.props.dispatch(fetchShouts());
  }

  render() {
    return (
      <div>
        <h1 styleName='foo'>Shouts</h1>
        <FieldList>
          <FieldType name="Text" fieldComponent={Field}></FieldType>
        </FieldList>
        <FormCanvas></FormCanvas>
      </div>
    );
  }
}

export default connect(state => ({ shouts: state.shouts }))(Application);
