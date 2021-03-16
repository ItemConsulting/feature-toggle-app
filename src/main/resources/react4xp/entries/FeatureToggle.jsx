import * as React from 'react';
import PropTypes from 'prop-types';
import { Provider, useDispatch } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { configureAppStore } from './store/configureStore';

import { Main } from './containers/Main/index';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';
import { AppBar, CssBaseline, makeStyles, responsiveFontSizes, Toolbar, Typography } from '@material-ui/core';
import { setServiceUrls } from './containers/Main/actions'

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
    },
    typography: {
      htmlFontSize: 10,
    },
  })
);

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
});

function FeatureToggle(props) {
  const classes = useStyles();
  return (
    <Provider store={configureAppStore()}>
      <ServiceUrls getSpacesUrl={props.getSpacesUrl} />
      <HelmetProvider>
        <BrowserRouter>
          <Helmet titleTemplate="Feature Toggle" defaultTitle="Feature Toggle"></Helmet>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={classes.root}>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" className={classes.title}>
                    Feature Toggle
                  </Typography>
                </Toolbar>
              </AppBar>
              <Switch>
                <Route path="/" component={Main} />
              </Switch>
            </div>
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}

function ServiceUrls(props) {
  const dispatch = useDispatch();
  setServiceUrls(dispatch, props.getSpacesUrl);
  return null;
}

FeatureToggle.propTypes = {
  getSpacesUrl: PropTypes.string,
};

export default (props) => <FeatureToggle {...props} />;
