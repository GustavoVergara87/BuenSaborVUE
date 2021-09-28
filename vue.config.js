// http://elbuensabor.ddns.net:82
// https://localhost:44350
const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/dist/'
    : '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://elbuensabor.ddns.net:82',
      },
      '/image': {
        target: 'http://elbuensabor.ddns.net:82/api/Images',
        pathRewrite: { '^/image': '' }
      },
      '/notificacionesHub': {
        target: 'http://elbuensabor.ddns.net:82/notificacionesHub',
        pathRewrite: { '^/notificacionesHub': '' }
      }
    },
  }
}
