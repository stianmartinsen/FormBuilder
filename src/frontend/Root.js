import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import thunk from 'redux-thunk';

import { Application } from './components';
import * as reducers from './reducers';

const reducer = combineReducers(reducers);
const finalCreateStore = compose(
  // Enables your middleware:
  applyMiddleware(thunk), // any Redux middleware, e.g. redux-thunk
  // Provides support for DevTools:
  devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);
const store = finalCreateStore(reducer);

export default class Root extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Provider store={ store }>
          <Router history={ history }>
            <Route path='/' component={ Application } />
          </Router>
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}
Root.propTypes = {
    history: PropTypes.object.isRequired
};
