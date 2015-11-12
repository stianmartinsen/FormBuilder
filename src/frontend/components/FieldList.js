import React, { Component, PropTypes } from 'react';

export default class FieldList extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}