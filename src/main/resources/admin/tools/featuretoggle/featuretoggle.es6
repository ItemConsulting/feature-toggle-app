const {
  render
} = __non_webpack_require__( '/lib/thymeleaf')
const {
  assetUrl
} = __non_webpack_require__('/lib/xp/portal')

const view = resolve('./featuretoggle.html')

exports.get = (req) => {
  return {
    body: render(view, {
      jsBundle: assetUrl({
        path: 'js/bundle.js'
      }),
      styleBundle: assetUrl({
        path: 'styles/bundle.css'
      })
    })
  }
}