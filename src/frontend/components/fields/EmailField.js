import React, { Component } from 'react';
import Field from './Field';

export default class EmailField extends Component {
  render() {
    return (
      <Field type="email" label="E-mail" {...this.props} />
    );
  }
}
