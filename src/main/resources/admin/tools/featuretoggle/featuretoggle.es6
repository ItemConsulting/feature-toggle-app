import { render as r4XpRender } from "/lib/enonic/react4xp";
const { render } = __non_webpack_require__("/lib/thymeleaf");
const { assetUrl, serviceUrl } = __non_webpack_require__("/lib/xp/portal");
const view = resolve("./featuretoggle.html");

exports.get = (req) => {
  const props = {
    spacesUrl: serviceUrl({
      service: "spaces",
    }),
    featuresUrl: serviceUrl({
      service: "features",
    }),
    publishFeatureUrl: serviceUrl({
      service: "publishFeature",
    }),
  };

  const featureToggle = r4XpRender("FeatureToggle", props, req, {
    id: "feature-toggle",
    ssr: false,
  });

  return {
    body: render(view, {
      ...getAssets(),
      rendered: featureToggle.body,
      pageContributions: featureToggle.pageContributions,
    }),
    pageContributions: featureToggle.pageContributions,
  };
};

function getAssets() {
  return {
    jsBundle: assetUrl({
      path: "js/bundle.js",
    }),
    styleBundle: assetUrl({
      path: "styles/bundle.css",
    }),
  };
}
