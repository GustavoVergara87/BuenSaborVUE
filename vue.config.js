// http://elbuensabor.ddns.net:82
// https://localhost:44350
const path = require('path');
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://localhost:44350',
      },
      '/image': {
        target: 'https://localhost:44350/api/Articulos/Image',
        pathRewrite: { '^/image': '' }
      },
      '/notificacionesHub': {
        target: 'https://localhost:44350/notificacionesHub',
        pathRewrite: { '^/notificacionesHub': '' }
      }
    },
  }
}
