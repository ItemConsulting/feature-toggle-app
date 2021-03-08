const { create } = __non_webpack_require__('/lib/featureToggle')

try {
  log.info('345')
  create()
} catch(e) {
  log.info(e)
}