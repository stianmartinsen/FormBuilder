import React, { Component } from 'react';
import Field from './Field';

class EmailField extends Component {
  render() {
    return (
      <Field type="email" label="E-mail" {...this.props} />
    );
  }
}

export default EmailField
