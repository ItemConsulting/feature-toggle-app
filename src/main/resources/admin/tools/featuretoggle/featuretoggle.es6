import { React4xp } from "/lib/enonic/react4xp";
const { render } = __non_webpack_require__('/lib/thymeleaf');
const { assetUrl, serviceUrl } = __non_webpack_require__('/lib/xp/portal');
const view = resolve('./featuretoggle.html');

exports.get = (req) => {
  const featureToggle = new React4xp('FeatureToggle')
    .setProps({
      spacesUrl: serviceUrl({
        service: 'spaces',
      }),
      featuresUrl: serviceUrl({
        service: 'features',
      }),
      publishFeatureUrl: serviceUrl({
        service: 'publishFeature',
      }),
    })
    .setId('feature-toggle');

  const pageContributions = featureToggle.renderPageContributions({
    clientRender: true,
  });

  let body = render(view, {
    jsBundle: assetUrl({
      path: 'js/bundle.js',
    }),
    styleBundle: assetUrl({
      path: 'styles/bundle.css',
    }),
    pageContributions,
  });

  body = featureToggle.renderBody({
    body,
    clientRender: true,
  });

  return {
    body,
    pageContributions,
  };
};
