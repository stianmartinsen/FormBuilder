import React, { Component } from 'react';
import { connect } from 'react-redux';

import CSSModules from 'react-css-modules';
import styles from '../css/fieldType.css';

@CSSModules(styles)
class FieldOptions extends Component {
  render() {
    return (
      <div>
        {this.props.fields.map((field, i) => {
          if (field.id == this.props.activeField) {
            const Field = field.fieldComponent;
            return <Field />
          }
        })}
      </div>
    );
  }
}

export default connect(state => ({activeField: state.activeField}))(FieldOptions);
