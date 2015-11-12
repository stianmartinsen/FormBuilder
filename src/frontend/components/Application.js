import React from 'react';
import { fetchShouts } from '../actions';
import { connect } from 'react-redux';

import CSSModules from 'react-css-modules';
import styles from './test.css';

@CSSModules(styles)
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
        <ul>
          { this.props.shouts.map((s, i) => <li key={i}>{s}</li>) }
        </ul>
      </div>
    );
  }
}

export default connect(state => ({ shouts: state.shouts }))(Application);