const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://152.136.185.210:5000",
        changeOrigin: true,
        ws:false,
        secure: false,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
}
