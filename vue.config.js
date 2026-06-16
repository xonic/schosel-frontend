const { version } = require('./package.json')

module.exports = {
  lintOnSave: false,
  publicPath: '/',
  devServer: {
    host: '127.0.0.1',
    open: 'google chrome'
  },
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      definitions[0]['process.env.VUE_APP_VERSION'] = JSON.stringify(version)
      return definitions
    })
  }
}
