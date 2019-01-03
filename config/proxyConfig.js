module.exports = {
  proxyList: {
    '/Sz_dxyq': {
      target: 'http://192.168.31.103:8084',
      // target: 'http://192.168.31.115:8084',
      // target: 'http://192.168.31.202:8084',
      // target: 'http://192.168.31.108:8084',
      changeOrigin: true,
      pathRewrite: {
        '^/Sz_dxyq': '/Sz_dxyq'
      }
    },
  }
}
