import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { setActiveField, removeField } from '../../actions';

import CSSModules from 'react-css-modules';
import styles from '../../css/field.css';

@CSSModules(styles, {allowMultiple: true})
class Field extends Component {
  render() {
    return (
      <div styleName={"field " + (this.props.activeField == this.props.id ? "active" : "")} onClick={e => this.handleClick(e)}>
        <button styleName="removeButton" onClick={e => this.removeField(e)}>
          x
        </button>

        <label styleName="label">
          <span styleName="fieldType">{this.props.label ? this.props.label : 'Field'}</span>
          <span styleName="fieldTitle">{this.props.title ? this.props.title : 'No title'}</span>
        </label>
        <input styleName="input" type={this.props.type ? this.props.type : 'text'} readOnly />
      </div>
    );
  }

  removeField(e) {
    const { dispatch } = this.props;

    e.preventDefault();
    e.stopPropagation();
    dispatch(removeField(this.props.id));
  }

  handleClick(e) {
    const { dispatch } = this.props;
    dispatch(setActiveField(this.props.id));
  }
}

export default connect(state => ({activeField: state.activeField}))(Field);
