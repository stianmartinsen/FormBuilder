import React, { Component } from 'react';
import { connect } from 'react-redux';
import Field from './Field';
import { addCheckboxToField } from '../../actions';

import CSSModules from 'react-css-modules';
import styles from '../../css/field.css';

@CSSModules(styles)
class CheckboxesField extends Component {
  componentDidMount() {
    this.props.dispatch(addCheckboxToField(this.props.id, 'Foo', true));
    this.props.dispatch(addCheckboxToField(this.props.id, 'Bar', true));
  }

  render() {
    const { checkboxes } = this.props;

    return (
      <Field label="Checkboxes" {...this.props}>{checkboxes.map(this.renderCheckbox)}</Field>
    );
  }

  renderCheckbox(checkbox, i) {
    return (<div key={i}><label><input type="checkbox" disabled checked={checkbox.checked} />{checkbox.label}</label></div>);
  }
}
CheckboxesField.defaultFieldProps = {
  checkboxes: []
}

export default connect((state, props) => {
  return {checkboxes: state.fields.filter((field) => field.id === props.id)[0].fieldProps.checkboxes};
})(CheckboxesField);
