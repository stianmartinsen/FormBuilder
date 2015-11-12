import React, { Component, PropTypes } from 'react';

import CSSModules from 'react-css-modules';
import styles from '../../css/field.css';

@CSSModules(styles)
class Field extends Component {
  render() {
    return (
      <div styleName="field">
        <label styleName="label">
          <span styleName="fieldType">{this.props.label ? this.props.label : 'Field'}</span>
          <span styleName="fieldTitle">{this.props.title ? this.props.title : 'No title'}</span>
        </label>
        <input styleName="input" type={this.props.type ? this.props.type : 'text'} readOnly />
      </div>
    );
  }
}

export default Field
