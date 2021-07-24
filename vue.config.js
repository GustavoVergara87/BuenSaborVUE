const path = require('path');  
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://localhost:44350',
      },
      '/image': {
        target: 'https://localhost:44350/api/Articulos/Image',
        pathRewrite: {'^/image' : ''}
      }
    },
  }
}
