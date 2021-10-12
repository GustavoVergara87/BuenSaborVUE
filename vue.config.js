const path = require('path');
const serverURL = 'http://elbuensabor.ddns.net:82'
// const serverURL = 'https://localhost:44350'

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/BuenSaborVUE/'
    : '/',
  devServer: {
    proxy: {
      '/api': {
        target: serverURL,
      },
      '/image': {
        target: serverURL + '/api/Images',
        pathRewrite: { '^/image': '' }
      },
      '/notificacionesHub': {
        target: serverURL + '/notificacionesHub',
        pathRewrite: { '^/notificacionesHub': '' }
      }
    },
  },


}
