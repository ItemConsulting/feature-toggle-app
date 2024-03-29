import * as React from 'react';
import PropTypes from 'prop-types';
import { Provider, useDispatch } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { configureAppStore } from './store/configureStore';

import { Main } from './containers/Main/index';
import { Header } from './containers/Header/index';

import { createTheme, ThemeProvider, styled, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { setServiceUrls } from './containers/Main/actions';

const PREFIX = 'FeatureToggle';

const classes = {
  root: `${PREFIX}-root`
};

const StyledFeatureToggle = styled(FeatureToggle)({
  [`& .${classes.root}`]: {
    flexGrow: 1,
  },
});

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
    },
    typography: {
      htmlFontSize: 10,
    },
  })
);

function FeatureToggle(props) {

  return (
    <Provider store={configureAppStore()}>
      <ServiceUrls spacesUrl={props.spacesUrl} featuresUrl={props.featuresUrl} publishFeatureUrl={props.publishFeatureUrl} />
      <HelmetProvider>
        <Helmet titleTemplate="Feature Toggle" defaultTitle="Feature Toggle"></Helmet>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className={classes.root}>
            <Header />
            <Main />
          </div>
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  );
}

function ServiceUrls(props) {
  const dispatch = useDispatch();
  setServiceUrls(dispatch, props.spacesUrl, props.featuresUrl, props.publishFeatureUrl);
  return null;
}

FeatureToggle.propTypes = {
  spacesUrl: PropTypes.string,
  featuresUrl: PropTypes.string,
  publishFeatureUrl: PropTypes.string,
};

export default (props) => <StyledFeatureToggle {...props} />;
