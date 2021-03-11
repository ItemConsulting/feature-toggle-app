import * as React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { configureAppStore } from './store/configureStore';

import { Main } from './containers/Main/index';
function FeatureToggle(props) {
  return (
    <Provider store={configureAppStore()}>
      <HelmetProvider>
        <BrowserRouter>
          <Helmet titleTemplate="Feature Toggle" defaultTitle="Feature Toggle"></Helmet>

          <Switch>
            <Route path="/" component={Main} />
          </Switch>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}

FeatureToggle.propTypes = {};

export default (props) => <FeatureToggle {...props} />;
